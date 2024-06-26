import {
  createNewsAPI,
  deleteNewsAPI,
  getAllNewsAPI,
  getNewsByIdAPI,
  updateNewsAPI,
} from '@/services/event';
import { NewsEventInput } from '@/utils/validators/create-news.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createNews = createAsyncThunk(
  'user/createNews',
  async (data: NewsEventInput) => {
    try {
      const eventData = await createNewsAPI({ data });
      console.log('eventData', eventData);

      return eventData;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Create Event');
    }
  }
);

export const getAllNews = createAsyncThunk('user/getAllNews', async () => {
  try {
    const eventData = await getAllNewsAPI();
    console.log('eventData', eventData);

    return eventData.data;
  } catch (error) {
    // If authentication fails, throw an error
    throw new Error('Failed to Get Event');
  }
});

export const getNewsById = createAsyncThunk(
  'user/getNewsById',
  async (id: any) => {
    try {
      const eventData = await getNewsByIdAPI(id);
      console.log('eventData', eventData);
      return eventData.data;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Get Event');
    }
  }
);

export const deleteNewsByIdAPI = createAsyncThunk(
  'user/deleteNewsByIdAPI',
  async (id: any) => {
    try {
      const event = await deleteNewsAPI(id);
      console.log('event', event);
      return event;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Delete Event');
    }
  }
);


export const updateNews = createAsyncThunk(
  'user/updateEvent',
  async ({ id, data }: { id: any; data: any }) => {
    try {
      const eventData = await updateNewsAPI({ data: data, id: id });
      console.log('eventData', eventData);

      return eventData;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Update Event');
    }
  }
);
