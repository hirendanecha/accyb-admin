import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createNews,
  deleteNewsByIdAPI,
  getAllNews,
  getNewsById,
  updateNews,
} from '../actions/newsActions';
import { deleteNewsAPI, getNewsByIdAPI } from '@/services/event';

interface UserState {
  news: any;
  eventsDetails: any;
  userNews: any;
  newsDetails: any;
  loading: boolean;
  updatedNewsData: any;
  error: any;
}

const initialState: UserState = {
  news: null,
  userNews: null,
  newsDetails: null,
  eventsDetails: null,
  updatedNewsData: null,
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNews.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createNews.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.news = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        createNews.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(getAllNews.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllNews.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          console.log(payload, 'payload');

          state.userNews = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getAllNews.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(getNewsById.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getNewsById.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.newsDetails = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getNewsById.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(deleteNewsByIdAPI.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteNewsByIdAPI.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        deleteNewsByIdAPI.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(updateNews.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateNews.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.updatedNewsData = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        updateNews.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export default newsSlice.reducer;
