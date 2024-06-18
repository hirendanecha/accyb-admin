import axios from "axios";

const changePasswordAPI = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/user/changePassword`,
        { ...data },
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to change Password...');
    }
  };

  export default changePasswordAPI;