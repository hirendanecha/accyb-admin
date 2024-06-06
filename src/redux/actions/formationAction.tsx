import { createFormationAPI, deleteFormationAPI, getAllFormationsAPI, getFormationByIdAPI, updateFormationAPI } from "@/services/formation";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createFormation = createAsyncThunk(
  'user/createFormation',
  async (data: any) => {
    try {
      const formationData = await createFormationAPI({ data: data });
      console.log('formationData', formationData);

      return formationData;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Create Formation');
    }
  }
)

export const getAllFormations = createAsyncThunk('user/getAllFormations', async () => {
  try {
    const formationData = await getAllFormationsAPI();
    console.log('formationData', formationData);

    return formationData.data;
  } catch (error) {
    // If authentication fails, throw an error
    throw new Error('Failed to Get Formations');
  }
})

export const deleteFormationById = createAsyncThunk(
  'user/deleteFormationById',
  async (id: any) => {
    try {
      const formationData = await deleteFormationAPI(id);
      console.log('formationData', formationData);

      return formationData;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to delete Formation');
    }
  }
)

export const updateFormation = createAsyncThunk(
  'user/updateFormation',
  async ({ id, data }: { id: any; data: any }) => {
    try {
      const formationData = await updateFormationAPI({ data: data, id: id });
      console.log('formationData', formationData);

      return formationData;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Update Formation');
    }
  }
)

export const getFormationById = createAsyncThunk(
  'user/getFormationById',
  async (id: any) => {
    try {
      const formationData = await getFormationByIdAPI(id);
      console.log('formationData', formationData);

      return formationData.data;
    } catch (error) {
      // If authentication fails, throw an error
      throw new Error('Failed to Get Formation');
    }
  }
)