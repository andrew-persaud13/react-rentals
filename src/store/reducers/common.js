import { combineReducers } from 'redux';

export const isFetchingReducer = resource => {
  return (state = false, action) => {
    if (resource !== action.resource) return state;
    switch (action.type) {
      case 'REQUEST_DATA':
        return true;
      case 'REQUEST_DATA_COMPLETE':
        return false;
      default:
        return state;
    }
  };
};

export const itemsReducer = resource => {
  return (state = [], action) => {
    if (resource !== action.resource) return state;

    switch (action.type) {
      case 'REQUEST_DATA':
        return [];
      case 'REQUEST_DATA_COMPLETE':
        return action.payload;
      case 'DATA_REMOVE':
        return state.filter(item => item._id !== action._id);
      case 'DATA_UPDATE':
        return state.map(item =>
          item._id === action._id ? action.payload : item
        );
      default:
        return state;
    }
  };
};

export const errorsReducer = resource => {
  return (state = [], action) => {
    if (resource !== action.resource) return state;

    switch (action.type) {
      case 'DATA_ERROR':
        return action.payload;
      case 'REQUEST_DATA':
      case 'DATA_REMOVE':
      case 'DATA_UPDATE':
        return [];
      default:
        return state;
    }
  };
};

export const createList = resource => {
  const items = itemsReducer(resource);
  const isFetching = isFetchingReducer(resource);
  const errors = errorsReducer(resource);

  return combineReducers({
    items,
    isFetching,
    errors,
  });
};
