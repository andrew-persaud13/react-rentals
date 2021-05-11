import axiosService from 'services/AxiosService';
export * from './auth';
export * from './rentals';
export * from './bookings';

const { bwmAxios } = axiosService;

export const extractApiErrors = resError => {
  //default error

  let errors = [
    { title: 'Error!', detail: 'Something went wrong. Please try again.' },
  ];

  //over write default if it's error from our api
  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors; //this is an array of errors from backend
  }

  return errors;
};

export const uploadImage = image => {
  const formData = new FormData();
  formData.append('image', image);
  return bwmAxios.post('/image-upload', formData).then(res => res.data);
};
