import React from 'react';
import { EditableComponent } from './EditableComponent';

export class EditableInput extends React.Component {
  render() {
    return (
      <EditableComponent
        renderComponent={({ value, handleChange, handleKeyDown }) => (
          <input
            className={`editable-item ${this.props.className}`}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        )}
        {...this.props}
      />
    );
  }
}
