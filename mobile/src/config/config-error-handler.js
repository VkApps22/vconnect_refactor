import axios from 'axios';
import ServiceError from '../services/service-error';

export default (onNetworkError) => {
  const axiosErrorHandler = async (error) => {
    if (error.response) {
      if (
        error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 404
      )
        onNetworkError();

      throw new ServiceError(
        error.response.data && error.response.data.messageCode
          ? error.response.data.messageCode
          : 'aw-snap-something-went-wrong',
        error
      );
    } else if (error.request) {
      onNetworkError();
      throw new ServiceError('server-cannot-be-reached', error);
    } else {
      throw error;
    }
  };

  axios.interceptors.response.use(
    (response) => response,
    (error) => axiosErrorHandler(error)
  );
};
