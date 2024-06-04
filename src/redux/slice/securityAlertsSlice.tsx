import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getAllSecurityAlert,
    createSecurityAlert,
    getAlertById,
} from '../actions/securityAlertsAction';
import { deleteAlertByIdAPI } from '../actions/newsActions';
// import { deleteNewsAPI, getNewsByIdAPI } from '@/services/event';

interface UserState {
  securityAlert: any;
  userNews: any;
  newsDetails: any;
  eventsDetails: any;
  updatedNewsData: any;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
    securityAlert: null,
  userNews: null,
  newsDetails: null,
  eventsDetails: null,
  updatedNewsData: null,
  loading: false,
  error: null,
};

const securityAlertSlice = createSlice({
  name: 'securityAlerts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSecurityAlert.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllSecurityAlert.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.securityAlerts = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getAllSecurityAlert.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(createSecurityAlert.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createSecurityAlert.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          console.log(payload, 'payload');

          state.securityAlert = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        createSecurityAlert.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(getAlertById.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAlertById.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.securityAlert = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getAlertById.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(deleteAlertByIdAPI.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAlertByIdAPI.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        deleteAlertByIdAPI.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

    //   .addCase(updateNews.pending, (state: any) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(
    //     updateNews.fulfilled,
    //     (state: any, { payload }: PayloadAction<any>) => {
    //       state.updatedNewsData = payload;
    //       state.loading = false;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     updateNews.rejected,
    //     (state: any, { payload }: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = payload;
    //     }
    //   );
  },
});

export default securityAlertSlice.reducer;
