import React from 'react';
import { EditableComponent } from './EditableComponent';
import FileLoader from 'components/file-upload/FileLoader';

const ImageView = ({ value, ...rest }) => {
  debugger;
  return <img src={value} {...rest} alt=''></img>;
};

const createEventObject = value => ({ target: { value } }); //This is to set the value to the image id

export class EditableImage extends React.Component {
  render() {
    return (
      <EditableComponent
        viewComponent={ImageView}
        renderComponent={({ value, handleChange, handleKeyDown }) => (
          <FileLoader
            onFileUpload={image => handleChange(createEventObject(image))}
          />
        )}
        {...this.props}
      />
    );
  }
}
