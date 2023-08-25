import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid'

import { Component } from 'react';
import { getImages } from '../API/API';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton} from './Button/Button';
import { Modal } from './Modal/Modal';
import { useState } from 'react';
import { useEffect } from 'react';



export const App =() => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setErroe] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const changeQuery = newQuery => {
    setQuery(`${nanoid()}/${newQuery}`);
    setImages([]);
    setPage(1);
    setLoading(false);
    setIsLastPage(false);
  };

  useEffect(() => {
    
  })
  useEffect(() => {
    if(query === '')  return

  }, [query, page]);

 const handleLoadMore = () => {
    if (query.trim() !== ''){
     toast("🦄 Oops! Search query is empty!");
    } 
    setQuery(prevState => prevState + 1);
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
  
  
