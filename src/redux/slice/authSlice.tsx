import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changePassword, logIn } from '../actions/authAction';
import { meAction } from '../actions/userAction';

interface UserState {
  user: any;
  changepassword: any;
  userMe: any;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  user: null,
  changepassword: null,
  userMe: null,
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

      .addCase(changePassword.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state: any, {payload}: PayloadAction<any>) => {
        state.changepassword = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state: any, {payload}: PayloadAction<any>) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(meAction.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(meAction.fulfilled, (state: any, {payload}: PayloadAction<any>) => {
        state.userMe = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(meAction.rejected, (state: any, {payload}: PayloadAction<any>) => {
        state.loading = false;
        state.error = payload;
      })

  },
});

export default userSlice.reducer;
