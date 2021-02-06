import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rentalsReducer from './reducers/rentals';
import rentalReducer from './reducers/rental';
import authReducer from './reducers/auth';
import manageReducer from './reducers/manage';

const initStore = () => {
  const reducers = combineReducers({
    rentals: rentalsReducer,
    rental: rentalReducer,
    auth: authReducer,
    manage: manageReducer,
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

  return store;
};

export default initStore;
