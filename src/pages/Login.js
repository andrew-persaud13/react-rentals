import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LoginForm from '../components/forms/LoginForm';
import ApiErrors from '../components/forms/ApiErrors';
import { withAuth } from '../providers/AuthProvider';

class Login extends Component {
  state = {
    errors: [],
    shouldRedirect: false,
  };

  loginUser = (formData) => {
    this.props.auth
      .signIn(formData)
      .then(({ token }) => {
        this.setState({ shouldRedirect: true });
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { errors, shouldRedirect } = this.state;
    const { message } = this.props.location.state || '';

    if (shouldRedirect) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5">
            <h1 className="page-title">Login</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <LoginForm onSubmit={this.loginUser} />
            <ApiErrors errors={errors} />
          </div>
          <div className="col-md-6 ml-auto">
            <div className="image-container">
              <h2 className="catchphrase">
                Hundreds of awesome places in reach of few clicks.
              </h2>
              <img src="/images/login-image.jpg" alt="Login an user" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
