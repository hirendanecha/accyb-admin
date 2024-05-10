import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logIn } from '../actions/authAction';

interface UserState {
  user: any;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state: any, {payload}: PayloadAction<any>) => {
        state.user = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(logIn.rejected, (state: any, {payload}: PayloadAction<any>) => {
        state.loading = false;
        state.error = payload;
      })

  },
});

export default userSlice.reducer;
