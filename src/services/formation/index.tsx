import axios from 'axios';

export const createFormationAPI = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/formation/add`,
      data.data
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create formation...');
  }
};

export const getAllFormationsAPI = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/web/formations`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to get formations...');
  }
};

export const getFormationByIdAPI = async (id: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/web/formation/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to get formation...');
  }
};


export const updateFormationAPI = async ({ id, data }: { id: any; data: any }) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/formation/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update formation...');
  }
}


export const deleteFormationAPI = async (id: any) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/formation/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete formation...');
  }
}