import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchSerchQuery } from 'api/api';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    showModal: false,
    page: 1,
    status: 'idle',
    url: '',
    hits: 1,
  };
  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
    });
  };

  toggleModal = e => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      hits: 1,
    }));
  };

  imageForModalHandler = data => {
    this.setState({ url: data });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const response = await fetchSerchQuery(searchQuery, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolved',
          hits: response.hits.length,
        }));
      } catch (error) {}
    }
    this.scroll();
  }

  scroll = () => {
    window.scrollTo(
      0,
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  };

  render() {
    const { images, showModal, url, status, hits } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'pending' ? <Loader /> : ''}
        {status === 'resolved' ? (
          <ImageGallery
            imagesArray={images}
            toggleModal={this.toggleModal}
            onImageClick={this.imageForModalHandler}
          ></ImageGallery>
        ) : (
          ''
        )}

        <div className="ButtonContainer">
          {hits === 12 ? <LoadMoreButton onClick={this.loadMoreHandler} /> : ''}
        </div>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={url} alt="" />
          </Modal>
        )}

        <ToastContainer />
      </>
    );
  }
}
