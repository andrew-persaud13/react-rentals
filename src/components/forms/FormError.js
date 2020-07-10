import React from 'react';

const FormError = ({ errors, name }) => {
  const error = errors[name] || null;
  if (!error) return null;
  return (
    <div className="alert alert-danger">
      <p>{error.message}</p>
    </div>
  );
};

export default FormError;
