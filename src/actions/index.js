import axios from 'axios';

export const extractApiErrors = resError => {
  //default error
  let errors = [
    { title: 'Error!', detail: 'Something went wrong. Please try again.' },
  ];

  //over write default if it's error from our api
  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors;
  }

  return errors;
};

export const fetchRentals = () => dispatch => {
  axios.get('/api/v1/rentals').then(res => {
    const rentals = res.data;
    dispatch({
      type: 'FETCH_RENTALS',
      payload: rentals,
    });
  });
};

export const fetchRentalByID = id => dispatch => {
  dispatch({ type: 'IS_FETCHING_RENTAL' });
  axios.get(`/api/v1/rentals/${id}`).then(response => {
    const rental = response.data;
    dispatch({
      type: 'FETCH_RENTAL_BY_ID',
      payload: rental,
    });
  });
};

export const createRental = rental => {
  return {
    type: 'CREATE_RENTAL',
    payload: rental,
  };
};

//Auth

export const registerUser = data => {
  return axios.post('/api/v1/users/register', data).catch(error => {
    return Promise.reject(extractApiErrors(error.response || {}));
  });
};

export const loginUserAction = data => {
  return axios
    .post('/api/v1/users/login', data)
    .then(res => res.data)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})));
};

export const userAuthenticated = decodedToken => ({
  type: 'USER_AUTHENTICATED',
  payload: decodedToken.username || '',
});
