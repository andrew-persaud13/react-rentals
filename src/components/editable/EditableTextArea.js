import React from 'react';
import { EditableComponent } from './EditableComponent';

export class EditableTextArea extends React.Component {
  render() {
    const { rows, cols, ...rest } = this.props;

    return (
      <EditableComponent
        renderComponent={({ value, handleChange, handleKeyDown }) => (
          <textarea
            value={value}
            onChange={handleChange}
            className={`editable-item ${this.props.className}`}
            rows={rows}
            cols={cols}
            onKeyDown={handleKeyDown}
          />
        )}
        {...rest}
      />
    );
  }
}
