import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ imagesArray, toggleModal, onImageClick }) {
  return (
    <ul className="ImageGallery">
      {imagesArray &&
        imagesArray.map(item => (
          <ImageGalleryItem
            image={item}
            key={item.id}
            toggleModal={toggleModal}
            onImageClick={onImageClick}
          />
        ))}
    </ul>
  );
}
