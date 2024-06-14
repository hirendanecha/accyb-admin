import axios from "axios";

const otpAPI = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/auth/enterOtp`,
        { ...data },
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to login...');
    }
  };

  export default otpAPI;