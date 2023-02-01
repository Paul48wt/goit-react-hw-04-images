import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchSerchQuery } from 'api/api';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [url, setUrl] = useState('');
  const [hits, setHits] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const loadMoreHandler = () => {
    setHits(1);
    setPage(prevState => prevState + 1);
  };

  const imageForModalHandler = data => {
    setUrl(data);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function getImages() {
      setStatus('pending');
      try {
        const response = await fetchSerchQuery(searchQuery, page);

        setImages(prevState => prevState.concat(response.hits));
        setHits(response.hits.length);
        setStatus('resolved');
      } catch (error) {
      } finally {
      }
    }
    getImages();
  }, [page, searchQuery]);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'pending' ? <Loader /> : ''}
      {status === 'resolved' ? (
        <ImageGallery
          imagesArray={images}
          toggleModal={toggleModal}
          onImageClick={imageForModalHandler}
        ></ImageGallery>
      ) : (
        ''
      )}

      <div className="ButtonContainer">
        {hits === 12 && status === 'resolved' ? (
          <LoadMoreButton onClick={loadMoreHandler} />
        ) : (
          ''
        )}
      </div>

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={url} alt="" />
        </Modal>
      )}

      <ToastContainer />
    </>
  );
}
