import { getAllSecurityAlerts, createSecurityAlertAPI, getAlertByIdAPI, updateSecurityAlertAPI } from '@/services/event';
import { NewsEventInput } from '@/utils/validators/create-news.schema';
import { SecurityAlertInput } from '@/utils/validators/create-security-alerts.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllSecurityAlert = createAsyncThunk(
  'user/getAllSecurityAlerts',
  async () => {
    try {
      const alertData = await getAllSecurityAlerts();
      console.log('alertData', alertData);

      return alertData.data;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Get security alerts');
    }
  }
);

// export const deleteSecurityAlert = createAsyncThunk('user/deleteSecurityAlert', async (id: any) => {
//   try {
//     const alertData = await getAllSecurityAlerts();
//     console.log('alertData', alertData);

//     return alertData.data;
//   } catch (error) {
//     // If authentication fails, throw an error
//     throw new Error('Failed to Get security alerts');
//   }
// })

export const createSecurityAlert = createAsyncThunk(
  'user/createSecurityAlert',
  async (data: any) => {
    try {
      const alertData = await createSecurityAlertAPI({data});
      console.log('alertData', alertData);

      return alertData.data;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to create security alerts//////////////////');
    }
  }
);

export const getAlertById = createAsyncThunk(
  'user/getAlertById',
  async (id: any) => {
    try {
      const alertData = await getAlertByIdAPI(id);
      console.log('eventData', alertData);
      return alertData.data;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Get Event');
    }
  }
);

export const updateSecurityAlert = createAsyncThunk(
  'user/updateSecurityAlert',
  async ({ id, data }: { id: any; data: any }) => {
    try {
      const alertData = await updateSecurityAlertAPI({ data: data, id: id });
      console.log('alertData', alertData);
      return alertData.data;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to update security alerts');
    }
  }
);