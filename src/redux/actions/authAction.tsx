import authAPI from '@/services/api/auth';
import { LoginSchema } from '@/utils/validators/login.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logIn = createAsyncThunk(
  'user/login',
  async (data:LoginSchema) => {
    try {
      const userData = await authAPI.loginApi({...data});
      console.log('userdata',userData);
      
      return userData;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to log in. Please check your credentials.');
    }
  }
);


// Define initial state
