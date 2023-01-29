import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';

export class ImageGallery extends Component {
  render() {
    return (
      <ul className="ImageGallery">
        {this.props.imagesArray &&
          this.props.imagesArray.map(item => (
            <ImageGalleryItem
              image={item}
              key={item.id}
              toggleModal={this.props.toggleModal}
              onImageClick={this.props.onImageClick}
            />
          ))}
      </ul>
    );
  }
}
