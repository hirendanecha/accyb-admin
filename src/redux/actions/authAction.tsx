import authAPI from '@/services/api/auth';
import otpAPI from '@/services/api/enterOtp';
import { LoginSchema } from '@/utils/validators/login.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logIn = createAsyncThunk(
  'user/login',
  async (data: LoginSchema) => {
    try {
      const userData = await authAPI({ ...data });
      return userData;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to log in. Please check your credentials.');
    }
  }
);

export const enterOtp = createAsyncThunk('user/enterOtp', async (data: any) => {
  try {
    const userData = await otpAPI({ ...data });
    return userData;
  } catch (error) {
    // If authentication fails, throw an error
    throw new Error('Failed to log in. Please check your credentials.');
  }
});
