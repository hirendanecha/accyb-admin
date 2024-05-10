import axios from 'axios';

const userAPI = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_LOCAL_URL}/api/auth/login`,
      { data }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to login...')
  }
};

export default userAPI;
