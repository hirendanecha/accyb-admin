import userAPI from '@/services/api/auth';
import {
  createEventAPI,
  deleteEventAPI,
  getAllEventsAPI,
  getEventByIdAPI,
  updateEventAPI,
} from '@/services/event';
import { CreateEventInput } from '@/utils/validators/create-event.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createEvent = createAsyncThunk(
  'user/login',
  async (data: CreateEventInput) => {
    try {
      const eventData = await createEventAPI({ data });
      console.log('eventData', eventData);

      return eventData;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Create Event');
    }
  }
);

export const getAllEvents = createAsyncThunk('user/getAllEvent', async () => {
  try {
    const eventData = await getAllEventsAPI();
    console.log('eventData', eventData);

    return eventData.data.data.events;
  } catch (error) {
    // If authentication fails, throw an error
    throw new Error('Failed to Get Event');
  }
});

export const updateEvent = createAsyncThunk(
  'user/updateEvent',
  async ({ id, data }: { id: any; data: any }) => {
    try {
      const eventData = await updateEventAPI({ data: data, id: id });
      console.log('eventData', eventData);

      return eventData;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Update Event');
    }
  }
);

export const getEventById = createAsyncThunk(
  'user/getEventById',
  async (id: any) => {
    try {
      const eventData = await getEventByIdAPI(id);
      console.log('eventData', eventData);
      return eventData.data;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Get Event');
    }
  }
);

export const deleteEventByIdAPI = createAsyncThunk(
  'user/deleteEventById',
  async (id: any) => {
    try {
      const event = await deleteEventAPI(id);
      console.log('event', event);
      return event;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Delete Event');
    }
  }
);
