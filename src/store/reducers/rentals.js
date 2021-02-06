import { combineReducers } from 'redux';
import { isFetchingReducer } from './common';

const initRentalsReducer = () => {
  const items = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_RENTALS':
        return action.payload;
      case 'CREATE_RENTAL':
        return [...state, action.payload];
      default:
        return state;
    }
  };

  const isFetching = isFetchingReducer('rentals');

  return combineReducers({
    items,
    isFetching,
  });
};

export default initRentalsReducer();
