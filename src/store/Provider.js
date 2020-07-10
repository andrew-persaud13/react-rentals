/*
See how provider gives access to global state

*/

import React from 'react';

export const StateContext = React.createContext({});

const Provider = ({ children, store }) => (
  <StateContext.Provider value={store}>{children}</StateContext.Provider>
);

export default Provider;
