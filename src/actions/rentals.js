import axiosService from '../services/AxiosService';
import { extractApiErrors } from './';
const { bwmAxios } = axiosService;

export const fetchRentals = (location = '') => dispatch => {
  dispatch({ type: 'REQUEST_DATA', resource: 'rentals' });
  bwmAxios.get(`/rentals?city=${location}`).then(res => {
    const rentals = res.data;
    dispatch({
      type: 'FETCH_RENTALS',
      payload: rentals,
    });
    dispatch({ type: 'REQUEST_DATA_COMPLETE', resource: 'rentals' });
  });
};

export const fetchRentalByID = id => dispatch => {
  dispatch({ type: 'REQUEST_DATA', resource: 'rental' });
  bwmAxios.get(`/rentals/${id}`).then(response => {
    const rental = response.data;
    dispatch({
      type: 'FETCH_RENTAL_BY_ID',
      payload: rental,
    });
    dispatch({ type: 'REQUEST_DATA_COMPLETE', resource: 'rental' });
  });
};

export const createRental = rental =>
  bwmAxios
    .post('/rentals', rental)
    .catch(error => Promise.reject(extractApiErrors(error.response || [])));

export const fetchUserRentals = () => dispatch => {
  dispatch({ type: 'REQUEST_DATA', resource: 'manage-rentals' });
  bwmAxios.get('/rentals/me').then(response =>
    dispatch({
      type: 'REQUEST_DATA_COMPLETE',
      payload: response.data,
      resource: 'manage-rentals',
    })
  );
};

export const deleteRental = rentalId => dispatch =>
  bwmAxios
    .delete(`/rentals/${rentalId}`)
    .then(response => response.data)
    .then(({ _id }) =>
      dispatch({
        type: 'DATA_REMOVE',
        resource: 'manage-rentals',
        _id,
      })
    )
    .catch(error => {
      const payload = extractApiErrors(error.response || {});
      dispatch({
        type: 'DATA_ERROR',
        payload,
        resource: 'manage-rentals',
      });
      return Promise.reject();
    });

export const updateRental = (rentalId, data) => dispatch =>
  bwmAxios
    .patch(`/rentals/${rentalId}`, data)
    .then(response => response.data)
    .then(payload =>
      dispatch({
        type: 'DATA_UPDATE',
        _id: rentalId,
        payload,
        resource: 'manage-rentals',
      })
    )
    .catch(error => {
      dispatch({
        type: 'DATA_ERROR',
        resource: 'manage-rentals',
        payload: extractApiErrors(error.response || []),
      });
      return Promise.reject(extractApiErrors(error.response || []));
    });

export const verifyRentalOwner = rentalId =>
  bwmAxios.get(`/rentals/${rentalId}/verify-user`);

export const unMountRental = () => ({ type: 'UNMOUNT_RENTAL' });
