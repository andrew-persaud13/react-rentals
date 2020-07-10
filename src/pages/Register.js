import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import RegisterForm from '../components/forms/RegisterForm';
import ApiErrors from '../components/forms/ApiErrors';

import { registerUser } from '../actions';

class Register extends Component {
  state = {
    shouldRedirect: false,
    errors: [],
  };

  onSubmit = (formData) => {
    registerUser(formData)
      .then(() => this.setState({ shouldRedirect: true }))
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { shouldRedirect, errors } = this.state;

    if (shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { message: 'You have been successfully registered!' },
          }}
        />
      );
    }
    return (
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5">
            <h1 className="page-title">Register</h1>
            <RegisterForm onSubmit={this.onSubmit} />
            <ApiErrors errors={errors} />
          </div>
          <div className="col-md-6 ml-auto">
            <div className="image-container">
              <h2 className="catchphrase">
                As our member you have access to most awesome places in the
                world.
              </h2>
              <img src="/images/register-image.jpg" alt="Register an user" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
