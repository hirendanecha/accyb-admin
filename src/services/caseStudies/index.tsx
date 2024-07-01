import axios from "axios";

export const createCaseStudiesAPI = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/caseStudies/add`,
        data.data
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to create Case Studies...');
    }
  }

  export const getAllCaseStudiesAPI = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/caseStudies/`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to get Case Studies...');
    }
  }

  export const getCaseStudiesByIdAPI = async (id: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/caseStudies/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to get Case Studies...');
    }
  }
  
  export const updateCaseStudiesAPI = async ({ id, data }: { id: any; data: any }) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/caseStudies/update/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update Case Studies...');
    }
  }
  
  export const deleteCaseStudiesAPI = async (id: any) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/caseStudies/delete/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete Case Studies...');
    }
  }