import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FileLoader from '../file-upload/FileLoader';

const CreateRentalForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const rentalOptions = ['apartment', 'condo', 'house'];

  useEffect(() => {
    register({ name: 'image' });
  }, [register]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input
          ref={register}
          type='text'
          className='form-control'
          id='title'
          name='title'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='city'>City</label>
        <input
          ref={register}
          type='text'
          className='form-control'
          id='city'
          name='city'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='street'>Street</label>
        <input
          ref={register}
          type='text'
          className='form-control'
          id='street'
          name='street'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='category'>Category</label>

        <select
          ref={register}
          name='category'
          className='form-control'
          id='category'
        >
          {rentalOptions.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label htmlFor='image'>Image</label>
        <FileLoader onFileUpload={image => setValue('image', image._id)} />
      </div>

      <div className='form-group'>
        <label htmlFor='bedrooms'>Rooms</label>
        <input
          ref={register}
          type='number'
          className='form-control'
          id='numOfRooms'
          name='numOfRooms'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='description'>Description</label>
        <textarea
          rows='5'
          ref={register}
          type='text'
          className='form-control'
          id='description'
          name='description'
        ></textarea>
      </div>

      <div className='form-group'>
        <label htmlFor='dailyRate'>Daily Price</label>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <div className='input-group-text'>$</div>
          </div>
          <input
            ref={register}
            type='number'
            name='dailyPrice'
            className='form-control'
            id='dailyPrice'
          />
        </div>
      </div>

      <div className='form-group'>
        <label htmlFor='shared'>Shared</label>
        <input
          ref={register}
          name='shared'
          type='checkbox'
          className='form-control'
          id='shared'
        />
      </div>
      <button type='submit' className='btn btn-bwm-main'>
        Create
      </button>
    </form>
  );
};

export default CreateRentalForm;
