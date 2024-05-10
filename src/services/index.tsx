import axios from 'axios';
import { signOut } from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';

axios.defaults.baseURL = baseURL;

export const axiosInterceptor = axios.interceptors.request.use(
  function (request) {
    const access_token =
      typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    if (access_token) {
      // Modify request here
      request.headers.Authorization = `Bearer ${access_token}`;
      // request.headers['x-access-token'] = `${access_token}`;

      // request.headers['ngrok-skip-browser-warning'] = 'true';
    }

    // const sessionId =
    //   typeof window !== 'undefined' ? localStorage.getItem('sessionId') : '';
    // if (sessionId) {
    //   request.headers['x-session-id'] = sessionId;
    // }
    return request;
  }
);

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { response } = error;

    if (response && response.status === 401) {
      if (typeof window !== 'undefined') {
        signOut();
        localStorage.removeItem('adminToken');
        localStorage.removeItem('sessionId');
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axios;
