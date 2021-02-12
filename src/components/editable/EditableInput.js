import React from 'react';
import { toast } from 'react-toastify';

class EditableInput extends React.Component {
  constructor({ entity, field }) {
    super();

    this.state = {
      value: entity[field],
      originalValue: entity[field],
      isActiveInput: false,
    };
  }

  setIsActive = (val = true) => {
    if (!val) this.setState({ value: this.state.originalValue });
    this.setState({ isActiveInput: val });
  };
  handleChange = e => this.setState({ value: e.target.value });

  update = () => {
    const { value, originalValue } = this.state;
    const { onUpdate, field } = this.props;

    if (!value.trim()) {
      toast.error('Please provide a value.');
      return this.setIsActive(false);
    } else if (value === originalValue) {
      return this.setIsActive(false);
    }

    onUpdate(
      { [field]: value },
      field,
      this.success(value),
      this.fail(originalValue)
    );
  };

  success = value => () =>
    this.setState({ isActiveInput: false, originalValue: value });

  fail = originalValue => () =>
    this.setState({ isActiveInput: false, value: originalValue });

  renderComponentView = () => {
    const { value, isActiveInput } = this.state;
    const { className } = this.props;

    if (isActiveInput) {
      return (
        <>
          <input type='text' value={value} onChange={this.handleChange} />
          <div className='button-container'>
            <button
              onClick={this.update}
              className='btn btn-success btn-editable'
            >
              Save
            </button>
            <button
              onClick={() => this.setIsActive(false)}
              className='btn btn-danger btn-editable'
            >
              Cancel
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <span className={className}>{value}</span>
        <div className='button-container'>
          <button
            onClick={this.setIsActive}
            className='btn btn-warning btn-editable'
          >
            Edit
          </button>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className='editable-component'>{this.renderComponentView()}</div>
    );
  }
}

export default EditableInput;
