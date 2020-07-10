import React from 'react';

const ApiErrors = ({ errors }) => {
  if (!errors || errors.length <= 0) return null;

  return (
    <div className="alert alert-danger">
      {errors.map((error) => (
        <p key={error.title}>{error.detail}</p>
      ))}
    </div>
  );
};

export default ApiErrors;
