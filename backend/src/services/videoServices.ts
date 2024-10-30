import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

export interface Video {
    title: string;
    file: File;
}

const VIDEO_API_KEY = process.env.VIDEO_API_KEY;
const VIDEO_API_LINK = process.env.VIDEO_API_LINK;
const VIDEO_API_BUCKET = process.env.VIDEO_API_BUCKET;
const VIDEO_API_PROJECT = process.env.VIDEO_API_PROJECT;

if (!VIDEO_API_KEY || !VIDEO_API_LINK) {
    throw new Error("Video API configuration is missing");
}

// Tüm videoları al
export const fetchVideos = async (): Promise<Video[]> => {
    try {
        const response = await axios.get(
            `${VIDEO_API_LINK}/${VIDEO_API_PROJECT}/${VIDEO_API_BUCKET}/${VIDEO_API_KEY}`
        );
        console.log("Fetched videos:", response.data); // Gelen videoları logla
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch videos:", error.message); // Hata loglama
        throw new Error(`Failed to fetch videos: ${error.message}`);
    }
};

// Belirli bir ID ile video al
export const fetchVideoById = async (videoId: string): Promise<Video> => {
    try {
        const response = await axios.get(
            `${VIDEO_API_LINK}/${VIDEO_API_PROJECT}/${VIDEO_API_BUCKET}/${VIDEO_API_KEY}/${videoId}`
        );
        console.log("Fetched video by ID:", response.data); // Gelen video detaylarını logla
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch video by ID:", error.message); // Hata loglama
        throw new Error(`Failed to fetch video by ID: ${error.message}`);
    }
};

// Video yükle
export const uploadVideoToAPI = async (file: Express.Multer.File) => {
    try {
        const formData = new FormData();
        const randomFileName = `${Date.now()}.mp4`;
        formData.append("file", file.buffer, randomFileName);
        formData.append("accessKey", VIDEO_API_KEY);
        formData.append("bucket", VIDEO_API_BUCKET);
        formData.append("project", VIDEO_API_PROJECT);

        console.log("Uploading video with details:", {
            fileName: randomFileName,
            accessKey: VIDEO_API_KEY,
            bucket: VIDEO_API_BUCKET,
            project: VIDEO_API_PROJECT,
        });

        const response = await axios.post(VIDEO_API_LINK, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        console.log("API Response:", response.data); // API yanıtını logla

        if (!response.data) {
            throw new Error("Invalid response from video API.");
        }

        return response.data;
    } catch (error: any) {
        console.error("Error during video upload:", error.response ? error.response.data : error.message);
        throw new Error(`Failed to upload video: ${error.message}`);
    }
};

// Video sil
export const deleteVideo = async (videoId: string): Promise<void> => {
    try {
        console.log("Deleting video with ID:", videoId); // Silinecek video ID'sini logla
        await axios.delete(
            `${VIDEO_API_LINK}/${VIDEO_API_PROJECT}/${VIDEO_API_BUCKET}/${VIDEO_API_KEY}/${videoId}`
        );
        console.log("Video deleted successfully."); // Silme işlemi başarılıysa logla
    } catch (error: any) {
        console.error("Failed to delete video:", error.message); // Hata loglama
        throw new Error(`Failed to delete video: ${error.message}`);
    }
};
