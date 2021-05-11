import React from 'react';

import ImageCrop from './ImageCrop';
import Spinner from 'components/shared/Spinner';
import { uploadImage } from 'actions';

import './file-loader.scss';

class ImageSnippet {
  constructor(src, name, type) {
    this.src = src;
    this.name = name;
    this.type = type;
  }
}

class FileLoader extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.fileReader = new FileReader();
    this.originalImg = null;
    this.state = {
      selectedImg: null,
      imgStatus: 'INIT',
      croppedImg: null,
    };
  }

  handleUploadImage = () => {
    const { onFileUpload } = this.props;
    const { croppedImg } = this.state;
    this.changeImageStatus('PENDING');
    const imageToUpload = this.blobToFile(croppedImg);
    uploadImage(imageToUpload)
      .then(uploadedImage => {
        //image document created in db, give to parent component using FileLoader
        onFileUpload(uploadedImage);
        this.changeImageStatus('UPLOADED');
      })
      .catch(_ => {
        this.changeImageStatus('ERROR');
      });
  };

  blobToFile = blob =>
    new File([blob], blob.name, {
      type: blob.type,
    });

  cancelImage = () => {
    this.setState({ selectedImg: null, imgStatus: 'INIT', croppedImg: null });
    this.inputRef.current.value = null;
    this.originalImg = null;
  };

  handleChange = e => {
    const file = e.target.files[0];
    this.fileReader.onloadend = event => {
      const imageSnippet = new ImageSnippet(
        event.target.result,
        file.name,
        file.type
      );
      this.setState({
        selectedImg: imageSnippet,
        imgStatus: 'LOADED',
      });
    };
    this.fileReader.readAsDataURL(file);
  };

  changeImageStatus = imgStatus => this.setState({ imgStatus });

  handleImageCropperLoad = image => {
    this.originalImg = image;
  };

  handleCropComplete = async crop => {
    if (!this.originalImg) return;
    const { selectedImg } = this.state;
    const croppedImg = await getCroppedImg(
      this.originalImg,
      crop,
      selectedImg.name
    );
    this.setState({
      croppedImg,
    });
  };

  render() {
    const { selectedImg, imgStatus, croppedImg } = this.state;
    return (
      <div className='img-upload-container mb-3'>
        <label className='img-upload btn btn-bwm-main'>
          <span className='upload-text'>Select an image</span>
          <input
            ref={this.inputRef}
            accept='.jpg, .png, .jpeg'
            className='form-control fileInput'
            type='file'
            onChange={this.handleChange}
          />
        </label>
        {selectedImg && (
          <ImageCrop
            src={selectedImg.src}
            onImageLoaded={this.handleImageCropperLoad}
            onCropComplete={this.handleCropComplete}
          />
        )}
        {selectedImg && (
          <>
            <div className='img-preview-container'>
              <div className='img-preview'>
                <img
                  src={croppedImg?.url || selectedImg.src}
                  alt='uploaded-rental'
                />
              </div>
              {imgStatus === 'PENDING' && (
                <div className='spinner-container upload-status'>
                  <Spinner />
                </div>
              )}
              {imgStatus === 'UPLOADED' && (
                <div className='alert alert-success upload-status'>
                  Image has been successfully uploaded!{' '}
                </div>
              )}
              {imgStatus === 'ERROR' && (
                <div className='alert alert-danger upload-status'>
                  Image upload failed. Try again.
                </div>
              )}
            </div>

            {imgStatus === 'LOADED' && (
              <button
                onClick={this.handleUploadImage}
                className='btn btn-success mr-1'
                type='button'
              >
                Upload
              </button>
            )}
            {!(imgStatus === 'UPLOADED') && (
              <button
                onClick={this.cancelImage}
                className='btn btn-danger'
                type='button'
              >
                Cancel
              </button>
            )}
          </>
        )}
      </div>
    );
  }
}

export default FileLoader;

function getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) {
          return reject('Canvas is empty.');
        }
        blob.name = fileName;
        const fileUrl = window.URL.createObjectURL(blob);
        blob.url = fileUrl;
        resolve(blob);
      },
      'image/jpeg',
      1
    );
  });
}
