import React from 'react';

import { useForm } from 'react-hook-form';

import FormError from './FormError';

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          ref={register({
            required: 'Email is required',
            pattern: { value: EMAIL_PATTERN, message: 'Invalid email' },
          })}
          type="text"
          className="form-control"
          id="email"
          name="email"
        />
        <FormError errors={errors} name="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          ref={register({ required: 'Password is required' })}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />
        <FormError errors={errors} name="password" />
      </div>
      <button className="btn btn-bwm-main">Submit</button>
    </form>
  );
};

export default LoginForm;
