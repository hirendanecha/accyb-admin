import axios from "axios";

export const createVideoAPI = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/add`,
        data.data
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to create security alert...');
    }
  }
  
export const getAllVideosAPI = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/video`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to get security alerts...');
    }
  }

export const deleteVideoAPI = async (id: any) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/delete/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete security alert...');
    }
  }

  export const updateVideoAPI = async ({ id, data }: { id: any; data: any }) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/update/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update security alert...');
    }
  }

  export const getVideoByIdAPI = async (id: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/getById/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to get security alert by ID...');
    }
  }