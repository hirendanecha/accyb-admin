import { createVideoAPI, deleteVideoAPI, getAllVideosAPI, getVideoByIdAPI, updateVideoAPI } from "@/services/videos";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createVideo = createAsyncThunk(
    'user/createVideo',
    async (data: any) => {
        try {
            const videoData = await createVideoAPI({ data });
            console.log('videoData', videoData);

            return videoData;
        } catch (error) {
            // If authentication fails, throw an error
            throw new Error('Failed to Create Video');
        }
    }
)

export const getAllVideos = createAsyncThunk('user/getAllVideos', async () => {
    try {
        const videoData = await getAllVideosAPI();
        console.log('videoData', videoData);
        return videoData.data;
    } catch (error) {
        // If authentication fails, throw an error
        throw new Error('Failed to Get Videos');
    }
})

export const deleteVideoByIdAPI = createAsyncThunk(
    'user/deleteVideoByIdAPI',
    async (id: any) => {
        try {
            const video = await deleteVideoAPI(id);
            console.log('video', video);
            return video;
        } catch (error) {
            // If authentication fails, throw an error
            throw new Error('Failed to Delete Video');
        }
    }
)

export const updateVideo = createAsyncThunk(
    'user/updateVideo',
    async ({ id, data }: { id: any; data: any }) => {
        try {
            const videoData = await updateVideoAPI({ data: data, id: id });
            console.log('videoData', videoData);
            return videoData;
        } catch (error) {
            // If authentication fails, throw an error
            throw new Error('Failed to Update Video');
        }
    }
)

export const getVideoById = createAsyncThunk(
    'user/getVideoById',
    async (id: any) => {
        try {
            const videoData = await getVideoByIdAPI(id);
            console.log('videoData', videoData);
            return videoData.data;
        } catch (error) {
            // If authentication fails, throw an error
            throw new Error('Failed to Get Video');
        }
    }
)