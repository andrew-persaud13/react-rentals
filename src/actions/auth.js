import axiosService from '../services/AxiosService';
import { extractApiErrors } from './';

const { bwmAxios } = axiosService;

//Auth

export const registerUser = data => {
  return bwmAxios.post('/users/register', data).catch(error => {
    return Promise.reject(extractApiErrors(error.response || {}));
  });
};

export const loginUserAction = data => {
  return bwmAxios
    .post('/users/login', data)
    .then(res => res.data)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})));
};

export const userAuthenticated = decodedToken => ({
  type: 'USER_AUTHENTICATED',
  payload: decodedToken.username || '',
});
