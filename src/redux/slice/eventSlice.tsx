import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createEvent,
  deleteEventByIdAPI,
  getAllEvents,
  getEventById,
  updateEvent,
} from '../actions/eventAction';

interface UserState {
  user: any;
  eventsDetails: any;
  userEvents: any;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  user: null,
  userEvents: null,
  eventsDetails: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createEvent.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.user = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        createEvent.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(getAllEvents.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllEvents.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.userEvents = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getAllEvents.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(updateEvent.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateEvent.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.updatedEventData = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        updateEvent.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(getEventById.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getEventById.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.eventsDetails = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getEventById.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(deleteEventByIdAPI.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteEventByIdAPI.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        deleteEventByIdAPI.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export default eventSlice.reducer;
