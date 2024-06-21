import { userMeAPI } from "@/services/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const meAction = createAsyncThunk(
    'user/meAction',
    async () => {
      try {
        const userData = await userMeAPI();
        console.log('userData', userData);
  
        return userData?._doc;
      } catch (error) {
        // If authentication fails, throw an error
        throw new Error('Failed to get use details...');
      }
    }
  );