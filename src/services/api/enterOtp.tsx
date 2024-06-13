import axios from "axios";

const otpAPI = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/enterOtp`,
        { ...data },
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to login...');
    }
  };

  export default otpAPI;