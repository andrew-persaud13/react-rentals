import axiosService from '../services/AxiosService';

const { bwmAxios } = axiosService;

export const fetchRentals = () => dispatch => {
  bwmAxios.get('/rentals').then(res => {
    const rentals = res.data;
    dispatch({
      type: 'FETCH_RENTALS',
      payload: rentals,
    });
  });
};

export const fetchRentalByID = id => dispatch => {
  dispatch({ type: 'IS_FETCHING_RENTAL' });
  bwmAxios.get(`/rentals/${id}`).then(response => {
    const rental = response.data;
    dispatch({
      type: 'FETCH_RENTAL_BY_ID',
      payload: rental,
    });
  });
};

export const createRental = rental => bwmAxios.post('/rentals', rental);
