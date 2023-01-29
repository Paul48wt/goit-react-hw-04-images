export const ImageGalleryItem = ({ image, toggleModal, onImageClick }) => {
  return (
    <>
      <li className="ImageGalleryItem">
        <img
          onClick={() => {
            toggleModal();
            onImageClick(image.webformatURL);
          }}
          className="ImageGalleryItem-image"
          src={image.webformatURL}
          alt={image.tags}
        />
      </li>
    </>
  );
};
