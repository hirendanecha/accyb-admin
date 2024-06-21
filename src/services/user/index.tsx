import axios from "axios";

export const userMeAPI = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/api/user/me`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to get user...');
    }
}