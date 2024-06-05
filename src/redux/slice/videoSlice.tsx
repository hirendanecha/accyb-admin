import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getAllSecurityAlert,
    createSecurityAlert,
    getAlertById,
} from '../actions/securityAlertsAction';
import { deleteAlertByIdAPI } from '../actions/newsActions';
import { createVideo, deleteVideoByIdAPI, getAllVideos, getVideoById, updateVideo } from '../actions/videoAction';
import { deleteVideoAPI } from '@/services/videos';
// import { deleteNewsAPI, getNewsByIdAPI } from '@/services/event';

interface UserState {
  loading: boolean;
  error: any;
  video: any;
  videos: any;
}

const initialState: UserState = {
  loading: false,
  error: null,
  video: null,
  videos: null,
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVideos.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllVideos.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.videos = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getAllVideos.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(createVideo.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createVideo.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          console.log(payload, 'payload');

          state.video = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        createVideo.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(getVideoById.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getVideoById.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.video = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getVideoById.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(deleteVideoByIdAPI.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteVideoByIdAPI.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        deleteVideoByIdAPI.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(updateVideo.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateVideo.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.video = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        updateVideo.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export default videoSlice.reducer;
