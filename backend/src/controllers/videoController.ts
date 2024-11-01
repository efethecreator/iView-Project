import { Request, Response } from "express";
import * as VideoService from "../services/videoServices";

// Tüm videoları al
export const getVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const videos = await VideoService.fetchVideos();
    res.status(200).json(videos);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Videolar bulunamadı";
    res.status(500).json({ message, error });
  }
};

// Belirli bir ID ile video al
export const getVideoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { interviewId } = req.body;
    const video = await VideoService.fetchVideoById(id, interviewId);
    if (!video) {
      res.status(404).json({ message: "Video bulunamadı" });
      return;
    }
    res.status(200).json(video);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Video bulunamadı";
    res.status(500).json({ message, error });
  }
};

// Video yükle
export const uploadVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Dosyanın yüklendiğini doğrula
    if (!req.file) {
      res.status(400).json({ message: "No video file uploaded." });
      return;
    }

    const { interviewId, userId } = req.body;

    // interviewId ve userId'nin eksik olmadığını doğrula
    if (!interviewId) {
      res.status(400).json({ message: "Missing interviewId." });
      return;
    }
    if (!userId) {
      res.status(400).json({ message: "Missing userId." });
      return;
    }

    // Video upload ve veritabanına ekleme işlemi
    const responseData = await VideoService.uploadVideoToAPI(
      req.file,
      userId,
      interviewId
    );

    // Güncellenmiş dökümanı döndür
    res.status(200).json(responseData.updatedInterview);
  } catch (error: unknown) {
    console.error("Error during video upload:", (error as Error).message);
    res.status(500).json({ message: "Video yüklenemedi", error: (error as Error).message });
  }
};


// Video sil
export const deleteVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await VideoService.deleteVideo(id);
    res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Video silinemedi";
    res.status(500).json({ message, error });
  }
};
