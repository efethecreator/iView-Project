// services/videoService.ts
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import InterviewVideos from "../models/interviewVideosModel";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.VIDEO_API_REGION,
  credentials: {
    accessKeyId: process.env.VIDEO_API_ACCESS_KEY!,
    secretAccessKey: process.env.VIDEO_API_SECRET_KEY!,
  },
});

// Interview ID'ye göre tüm videoları getir
export const fetchVideosByInterviewId = async (interviewId: string) => {
  try {
    const interviewVideos = await InterviewVideos.findOne({ interviewId });

    if (!interviewVideos || interviewVideos.videos.length === 0) {
      throw new Error("Videolar bulunamadı");
    }

    // S3 URL'lerini her video için oluştur
    const videosWithUrls = await Promise.all(
      interviewVideos.videos.map(async (video) => {
        const command = new GetObjectCommand({
          Bucket: process.env.VIDEO_API_BUCKET,
          Key: video.videoKey,
        });
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return { ...video.toObject(), s3Url: signedUrl };
      })
    );

    return videosWithUrls;
  } catch (error) {
    throw new Error(`Failed to fetch videos by Interview ID: ${(error as Error).message}`);
  }
};

// Tek bir video yükle
export const uploadVideoToAPI = async (
  file: Express.Multer.File,
  userId: string,
  interviewId: string
) => {
  try {
    const randomFileName = `${Date.now()}.mp4`;

    const command = new PutObjectCommand({
      Bucket: process.env.VIDEO_API_BUCKET,
      Key: randomFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: "inline",
    });

    const uploadResult = await s3Client.send(command);

    const updatedInterview = await InterviewVideos.findOneAndUpdate(
      { interviewId },
      {
        $push: {
          videos: {
            userId,
            videoKey: randomFileName,
          },
        },
      },
      { new: true, upsert: true }
    );

    return {
      randomFileName,
      uploadResult,
      updatedInterview,
    };
  } catch (error) {
    throw new Error(`Failed to upload video: ${(error as Error).message}`);
  }
};

// Belirli bir video sil
export const deleteVideo = async (videoId: string, interviewId: string) => {
  try {
    const interviewVideo = await InterviewVideos.findOne({ interviewId });
    const video = interviewVideo?.videos.find((v) => v._id === videoId);

    if (!video) {
      throw new Error("Video bulunamadı");
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.VIDEO_API_BUCKET,
      Key: video.videoKey,
    });
    await s3Client.send(command);

    await InterviewVideos.findOneAndUpdate(
      { interviewId },
      { $pull: { videos: { _id: videoId } } }
    );
  } catch (error) {
    throw new Error(`Failed to delete video: ${(error as Error).message}`);
  }
};
