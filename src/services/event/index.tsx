import axios from 'axios';

export const createEventAPI = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/event/add`,
      data.data
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create event...');
  }
};

export const getAllEventsAPI = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/event`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create event...');
  }
};

export const updateEventAPI = async ({ id, data }: { id: any; data: any }) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/event/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update event...');
  }
};

export const getEventByIdAPI = async (id: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/event/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to get event...');
  }
};

export const deleteEventAPI = async (id: any) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/event/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete event...');
  }
};

// news
export const createNewsAPI = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/add`,
      data.data
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create event...');
  }
};

export const getAllNewsAPI = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create event...');
  }
};

export const getNewsByIdAPI = async (id: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to get news...');
  }
};

export const deleteNewsAPI = async (id: any) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete news...');
  }
};

export const updateNewsAPI = async ({ id, data }: { id: any; data: any }) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update news...');
  }
};


export const getAllSecurityAlerts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/web/securityAlerts`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to get security alerts...');
  }
}

export const deleteAlertAPI = async (id: any) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/securityAlerts/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete security alert...');
  }
};

export const createSecurityAlertAPI = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/securityAlerts/add`,
      data.data
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create security alert...');
  }
}

export const getAlertByIdAPI = async (id: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/web/securityAlerts/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to get security alert by ID...');
  }
}

export const updateSecurityAlertAPI = async ({ id, data }: { id: any; data: any }) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/securityAlerts/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update security alert...');
  }
}