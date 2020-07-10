import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import AuthProvider, { useAuth } from './providers/AuthProvider';

import initStore from './store';

import Routes from './Routes';
import Header from './components/shared/Header';

const store = initStore();

const Providers = ({ children }) => (
  <Provider store={store}>
    <AuthProvider>{children}</AuthProvider>
  </Provider>
);

const BwmApp = () => {
  const authService = useAuth();

  useEffect(() => {
    authService.checkAuthState();
  });

  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  );
};

const App = () => {
  return (
    <Providers>
      <BwmApp />
    </Providers>
  );
};

export default App;
