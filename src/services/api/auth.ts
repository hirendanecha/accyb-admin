import { axiosInterceptor, default as axios } from '../index';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const instance = axios.create();

instance.interceptors.request.eject(axiosInterceptor);

const authAPI =  ( data: { email: string; password: string }) => {
  //    login admin api
//   loginApi(    
//     data: { email: string; password: string }
//   ) {
    return instance.post('/api/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
//   },
};
export default authAPI;


