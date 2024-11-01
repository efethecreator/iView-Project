import dotenv from "dotenv";
import axios from "axios";
import FormData from "form-data";
import {
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import InterviewVideos from "../models/interviewVideosModel";

dotenv.config();

export interface Video {
  title: string;
  file: File;
}

const VIDEO_API_BUCKET = process.env.VIDEO_API_BUCKET;
const VIDEO_API_SECRET_KEY = process.env.VIDEO_API_SECRET_KEY;
const VIDEO_API_ACCESS_KEY = process.env.VIDEO_API_ACCESS_KEY;
const VIDEO_API_REGION = process.env.VIDEO_API_REGION;

if (
  !VIDEO_API_SECRET_KEY ||
  !VIDEO_API_ACCESS_KEY ||
  !VIDEO_API_BUCKET ||
  !VIDEO_API_REGION
) {
  throw new Error("Video API configuration is missing");
}

const s3Client = new S3Client({
  region: VIDEO_API_REGION,
  credentials: {
    accessKeyId: VIDEO_API_ACCESS_KEY,
    secretAccessKey: VIDEO_API_SECRET_KEY,
  },
});

//Tüm videoları al
export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const response = await axios.get(``);
    console.log("Fetched videos:", response.data); // Gelen videoları logla
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch videos:", error.message); // Hata loglama
    throw new Error(`Failed to fetch videos: ${error.message}`);
  }
};

//Belirli bir ID ile video al
export const fetchVideoById = async (videoId: string, interviewId: string) => {
  try {
    const interviewVideo = await InterviewVideos.findOne({
      interviewId: interviewId,
    });

    const key = interviewVideo?.videos.filter(
      (video) => video.id === videoId
    )[0]?.videoKey;

    if (!key) {
      throw new Error("Video bulunamadı");
    }

    const command = new GetObjectCommand({
      Bucket: VIDEO_API_BUCKET,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 1 saat
    });

    console.log("Signed URL:", signedUrl); // Signed URL'yi logla

    return {
      signedUrl,
    };
  } catch (error: any) {
    console.error("Failed to fetch video by ID:", error.message); // Hata loglama
    throw new Error(`Failed to fetch video by ID: ${error.message}`);
  }
};

// Video yükle
export const uploadVideoToAPI = async (
  file: Express.Multer.File,
  userId: string,
  interviewId: string
) => {
  try {
    const randomFileName = `${Date.now()}.mp4`;

    const command = new PutObjectCommand({
      Bucket: VIDEO_API_BUCKET,
      Key: randomFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const uploadResult = await s3Client.send(command);

    console.log("Video uploaded successfully:", uploadResult);

    await InterviewVideos.findOneAndUpdate(
      { interviewId: interviewId },
      {
        $push: {
          videos: {
            userId: userId,
            videoKey: randomFileName,
          },
        },
      },
      { new: true } // Güncellenmiş dökümanı döndür
    );

    return {
      randomFileName,
      uploadResult,
    };
  } catch (error: any) {
    console.error(
      "Error during video upload:",
      error.response ? error.response.data : error.message
    );
    throw new Error(`Failed to upload video: ${error.message}`);
  }
};

//Video sil
export const deleteVideo = async (videoId: string): Promise<void> => {
  try {
    console.log("Deleting video with ID:", videoId); // Silinecek video ID'sini logla
    await axios.delete(``);
    console.log("Video deleted successfully."); // Silme işlemi başarılıysa logla
  } catch (error: any) {
    console.error("Failed to delete video:", error.message); // Hata loglama
    throw new Error(`Failed to delete video: ${error.message}`);
  }
};
