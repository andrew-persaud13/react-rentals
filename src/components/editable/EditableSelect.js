import React from 'react';
import { EditableComponent } from './EditableComponent';

export class EditableSelect extends React.Component {
  renderOptions = options =>
    options.map(option => (
      <option key={option} value={option}>
        {`${option}`}
      </option>
    ));

  render() {
    const { options, ...rest } = this.props;

    return (
      <EditableComponent
        {...rest}
        renderComponent={({ value, handleChange }) => (
          <select
            value={value}
            onChange={handleChange}
            className={`editable-item ${this.props.className}`}
          >
            {this.renderOptions(options)}
          </select>
        )}
      />
    );
  }
}
