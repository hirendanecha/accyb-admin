import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { enterOtp } from "../actions/authAction";

interface UserState {
    otp: any;
    loading: boolean;
    error: any;
}

const initialState: UserState = {
    otp: null,
    loading: false,
    error: null,
};

const enterOtpSlice = createSlice({
    name: 'enterOtp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(enterOtp.pending, (state: any) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                enterOtp.fulfilled,
                (state: any, { payload }: PayloadAction<any>) => {
                    state.otp = payload;
                    state.loading = false;
                    state.error = null;
                }
            )
            .addCase(
                enterOtp.rejected,
                (state: any, { payload }: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = payload;
                }
            );
    },
});

export default enterOtpSlice.reducer;