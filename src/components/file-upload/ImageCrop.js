import React from 'react';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

class ImageCrop extends React.Component {
  state = {
    crop: {
      unit: '%',
      x: 0,
      y: 0,
      width: 100,
      aspect: 3 / 2,
    },
  };

  onChange = crop => {
    this.setState({ crop });
  };

  render() {
    const { src, onImageLoaded, onCropComplete } = this.props;
    const { crop } = this.state;
    return (
      <ReactCrop
        src={src}
        crop={crop}
        onChange={this.onChange}
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
      />
    );
  }
}

export default ImageCrop;
