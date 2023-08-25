

import { ImageGalleryItemImg } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem =({ webformatURL, tags, largeImageURL })=>{
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };


  return (
    <>
      <ImageGalleryItemImg
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
    </>
  );
}
 