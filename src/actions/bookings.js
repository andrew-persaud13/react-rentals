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
