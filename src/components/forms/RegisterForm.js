import React from 'react';

import { useForm } from 'react-hook-form';

import { sameAs } from '../../helpers/validators';
import FormError from './FormError';

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors, getValues } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form-group'>
        <label htmlFor='username'>Username</label>
        <input
          ref={register({ required: 'Username is required' })}
          type='text'
          className='form-control'
          id='username'
          name='username'
        />
        <FormError errors={errors} name='username' />
      </div>

      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          ref={register({
            required: 'Email is required',
            pattern: { value: EMAIL_PATTERN, message: 'Invalid email' },
          })}
          type='text'
          className='form-control'
          id='email'
          name='email'
        />
        <FormError errors={errors} name='email' />
      </div>

      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          ref={register({
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be minimum 8 characters',
            },
          })}
          type='password'
          className='form-control'
          id='password'
          name='password'
        />
        <FormError errors={errors} name='password' />
      </div>

      <div className='form-group'>
        <label htmlFor='passwordConfirmation'>Confirm Password</label>
        <input
          ref={register({
            required: 'Password confirmation required',
            minLength: {
              value: 8,
              message: 'Password confirmation must be minimum 8 characters',
            },
            validate: { sameAs: sameAs('password', getValues) },
          })}
          type='password'
          className='form-control'
          id='passwordConfirmation'
          name='passwordConfirmation'
        />
        <FormError errors={errors} name='passwordConfirmation' />
      </div>
      <button type='submit' className='btn btn-bwm-main'>
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
