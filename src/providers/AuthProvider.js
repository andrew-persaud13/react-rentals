import React, { createContext, useContext } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { loginUserAction, userAuthenticated } from '../actions';

const AuthContext = createContext(null);

const AuthProvider = ({ children, dispatch }) => {
  const signIn = (formData) => {
    return loginUserAction(formData).then(({ token }) => {
      localStorage.setItem('bwm_token', token);
      const decodedToken = decodeToken(token);
      dispatch(userAuthenticated(decodedToken));
      return token;
    });
  };

  const decodeToken = (token) => {
    return jwt.decode(token);
  };

  const getToken = () => {
    return localStorage.getItem('bwm_token');
  };

  const getExpiration = (decodedToken) => {
    return moment.unix(decodedToken.exp);
  };

  //To persist the auth state on refreshes
  const checkAuthState = () => {
    const token = getToken();
    const decodedToken = decodeToken(token);
    if (token && moment().isBefore(getExpiration(decodedToken))) {
      dispatch(userAuthenticated(decodedToken));
    }
  };

  //For auth routes
  const isAuthenticated = () => {
    const decodedToken = decodeToken(getToken());
    return decodedToken && isTokenValid(decodedToken);
  };

  const isTokenValid = (decodedToken) => {
    return decodedToken && moment().isBefore(getExpiration(decodedToken));
  };

  const signOut = () => {
    localStorage.removeItem('bwm_token');
    dispatch({ type: 'USER_SIGNED_OUT' });
  };

  const authApi = {
    signIn,
    checkAuthState,
    signOut,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={authApi}>{children}</AuthContext.Provider>
  );
};

//For functional components
export const useAuth = () => {
  return useContext(AuthContext);
};

//For class components
export const withAuth = (Component) => (props) => (
  <AuthContext.Consumer>
    {(authApi) => <Component {...props} auth={authApi} />}
  </AuthContext.Consumer>
);

export default connect()(AuthProvider);
