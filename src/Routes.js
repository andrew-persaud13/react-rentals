import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthRoute from './components/auth/AuthRoute';
import GuestRoute from './components/auth/GuestRoute';

import RentalHome from './pages/RentalHome';
import RentalDetail from './pages/RentalDetail';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import SecretPage from './pages/SecretPage';

const Routes = () => {
  return (
    <div className="container bwm-container">
      <Switch>
        <Route exact path="/" component={RentalHome} />
        <GuestRoute path="/login" component={Login} />
        <GuestRoute path="/register" component={Register} />
        <AuthRoute path="/logout" component={Logout} />
        <Route path="/rentals/:id" component={RentalDetail} />
        <AuthRoute path="/secret" component={SecretPage} />
      </Switch>
    </div>
  );
};

export default Routes;
