import axios from '../../services/index';

const instance = axios.create();

const userAPI = async (data: any) => {
  try {

    return instance.post('/api/auth/login', data, {
      headers: {
      
        'Content-Type': 'application/json',
      },
    });
    // const response = await axios.post(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
    //   { ...data }
    // );
    // console.log('response', response);
    // return response.data;
  } catch (error) {
    throw new Error('Failed to login...');
  }
};

export default userAPI;
