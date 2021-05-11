import React from 'react';
import { toast } from 'react-toastify';

export class EditableComponent extends React.Component {
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

  handleKeyDown = e => {
    if (e.key === 'Enter') this.update();
    else if (e.key === 'Escape') this.setIsActive(false);
  };

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

  renderView = () => {
    const { value } = this.state;
    const { transform, className, viewComponent: ViewComponent } = this.props;
    const viewValue = transform ? transform(value) : `${value}`;

    if (ViewComponent)
      return (
        <ViewComponent
          value={viewValue}
          className={`editable-item ${className}`}
        />
      );

    return <span className={`editable-item ${className}`}>{viewValue}</span>;
  };

  renderComponentView = () => {
    const { value, isActiveInput } = this.state;
    const { renderComponent } = this.props;

    if (isActiveInput) {
      return (
        <>
          {renderComponent({
            value,
            handleChange: this.handleChange,
            handleKeyDown: this.handleKeyDown,
          })}
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
        {this.renderView()}
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
    const { containerType } = this.props;
    debugger;
    return (
      <div className={`editable-component editable-component-${containerType}`}>
        {this.renderComponentView()}
      </div>
    );
  }
}
