import axios from '../../services/index';

const userAPI = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
      { ...data }
    );
    console.log('response', response);
    return response.data;
  } catch (error) {
    throw new Error('Failed to login...');
  }
};

export default userAPI;
