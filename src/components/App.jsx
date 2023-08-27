import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid'

import { getImages } from '../API/API';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton} from './Button/Button';
import { Modal } from './Modal/Modal';
import { useState } from 'react';
import { useEffect } from 'react';



export const App = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const changeQuery = newQuery => {
    setQuery(`${nanoid()}/${newQuery}`);
    setImages([]);
    setPage(1);
    setLoading(false);
    setIsLastPage(false);
  };

  useEffect(() => {
    if (query === '') return;

    async function fetchImages() {
      const separatedQuery = query.split('/')[1];

      try {
        setLoading(true);
        const { hits, totalHits } = await getImages({ query: separatedQuery, page });
        setImages(prevState => [...prevState, ...hits]);
        setIsLastPage(page * 12 >= totalHits);
        setError(null);
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong!', {
          icon: '🤯',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    if (query.trim() === '') {
      toast("🦄 Oops! Search query is empty!");
      return;
    }
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <div>
        <SearchBar onSubmit={changeQuery} />
        {loading && <Loader />}
        {error && !loading && (
          toast.error("Something went wrong!", {
            icon: "😲"
          })
        )}
        <ImageGallery images={images} />
        {images.length > 0 && !loading && !isLastPage && (
          <LoadMoreButton onClick={handleLoadMore} />
        )}
        <Modal />
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
  
  
