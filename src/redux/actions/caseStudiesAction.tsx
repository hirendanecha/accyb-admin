import {
  createCaseStudiesAPI,
  deleteCaseStudiesAPI,
  getAllCaseStudiesAPI,
  getCaseStudiesByIdAPI,
  updateCaseStudiesAPI,
} from '@/services/caseStudies';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createCaseStudies = createAsyncThunk(
  'user/createCaseStudies',
  async (data: any) => {
    try {
      const caseStudiesData = await createCaseStudiesAPI({ data: data });
      console.log('caseStudiesData', caseStudiesData);

      return caseStudiesData;
    } catch (error) {
      throw new Error('Failed to Create Case Studies');
    }
  }
);

export const getAllCaseStudies = createAsyncThunk(
  'user/getAllCaseStudies',
  async () => {
    try {
      const caseStudiesData = await getAllCaseStudiesAPI();
      console.log('caseStudiesData', caseStudiesData);

      return caseStudiesData.data;
    } catch (error) {
      throw new Error('Failed to Get Case Studies');
    }
  }
);

export const getCaseStudiesById = createAsyncThunk(
  'user/getCaseStudiesById',
  async (id: any) => {
    try {
      const caseStudiesData = await getCaseStudiesByIdAPI(id);
      console.log('caseStudiesData', caseStudiesData);

      return caseStudiesData.data;
    } catch (error) {
      throw new Error('Failed to Get Case Studies');
    }
  }
);

export const deleteCaseStudiesById = createAsyncThunk(
  'user/deleteCaseStudiesById',
  async (id: any) => {
    try {
      const caseStudiesData = await deleteCaseStudiesAPI(id);
      console.log('caseStudiesData', caseStudiesData);

      return caseStudiesData;
    } catch (error) {
      throw new Error('Failed to Get Case Studies');
    }
  }
);

export const updateCaseStudies = createAsyncThunk(
  'user/updateCaseStudies',
  async ({ id, data }: { id: any; data: any }) => {
    try {
      const caseStudiesData = await updateCaseStudiesAPI({
        data: data,
        id: id,
      });
      console.log('caseStudiesData', caseStudiesData);

      return caseStudiesData;
    } catch (error) {
      throw new Error('Failed to Update Case Studies');
    }
  }
);
