import axios from 'axios';
// import { signOut } from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';

axios.defaults.baseURL = baseURL;

export const axiosInterceptor = axios.interceptors.request.use(
  function (request) {
    const access_token =
      typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    console.log(access_token, 'ele');
    if (access_token) {
      // Modify request here
      request.headers.Authorization = `Bearer ${access_token}`;
      request.headers['x-access-token'] = `${access_token}`;

      // request.headers['ngrok-skip-browser-warning'] = 'true';
    }

    const sessionId =
      typeof window !== 'undefined' ? localStorage.getItem('sessionId') : '';
    if (sessionId) {
      request.headers['x-session-id'] = sessionId;
    }
    return request;
  }
);

export default axios;
