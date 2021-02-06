import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import AuthProvider, { useAuth } from './providers/AuthProvider';

import initStore from './store';

import Routes from './Routes';
import Header from './components/shared/Header';
import MapProvider from 'providers/MapProvider';

const store = initStore();

const Providers = ({ children }) => (
  <Provider store={store}>
    <AuthProvider>
      <MapProvider apiKey='jKaqlzq27pRIj5atWwC5NeGYozgldx8I'>
        {children}
      </MapProvider>
    </AuthProvider>
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
      <ToastContainer />
      <BwmApp />
    </Providers>
  );
};

export default App;
