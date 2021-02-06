const { combineReducers } = require('redux');
const { createList } = require('./common');

const initManageReducer = () => {
  return combineReducers({
    rentals: createList('manage-rentals'),
    bookings: createList('manage-bookings'),
    receivedBookings: createList('received-bookings'),
  });
};

export default initManageReducer();
