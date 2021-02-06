import axiosService from '../services/AxiosService';
import { extractApiErrors } from './';

const { bwmAxios } = axiosService;

export const createBooking = data =>
  bwmAxios
    .post('/bookings', data)
    .then(res => res.data)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})));

export const getBookingsByRental = async rentalId =>
  bwmAxios.get(`/bookings/${rentalId}`);

export const fetchUserBookings = () => dispatch => {
  dispatch({ type: 'REQUEST_DATA', resource: 'manage-bookings' });
  bwmAxios.get('/bookings/me').then(response =>
    dispatch({
      type: 'REQUEST_DATA_COMPLETE',
      payload: response.data,
      resource: 'manage-bookings',
    })
  );
};

export const fetchUserReceivedBookings = () => dispatch => {
  dispatch({ type: 'REQUEST_DATA', resource: 'received-bookings' });
  bwmAxios.get('bookings/received').then(response =>
    dispatch({
      type: 'REQUEST_DATA_COMPLETE',
      payload: response.data,
      resource: 'received-bookings',
    })
  );
};
