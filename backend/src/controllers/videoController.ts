import { Request, Response } from "express";
import * as VideoService from "../services/videoServices";

// Tüm videoları al
export const getVideos = async (req: Request, res: Response): Promise<void> => {
    try {
        const videos = await VideoService.fetchVideos();
        res.status(200).json(videos);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Videolar bulunamadı";
        res.status(500).json({ message, error });
    }
};

// Belirli bir ID ile video al
export const getVideoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const video = await VideoService.fetchVideoById(id);
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
export const uploadVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            console.error("No video file uploaded.");
            res.status(400).json({ message: "No video file uploaded." });
            return;
        }

        console.log("Received file:", req.file); // Gelen dosyayı logla

        const responseData = await VideoService.uploadVideoToAPI(req.file);

        res.status(200).json(responseData);

    } catch (error) {
        console.error("Error during video upload:", error); // Hata loglama
        const message = error instanceof Error ? error.message : "Video yüklenemedi";
        res.status(500).json({ message, error });
    }
};

// Video sil
export const deleteVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await VideoService.deleteVideo(id);
        res.status(204).send();
    } catch (error) {
        const message = error instanceof Error ? error.message : "Video silinemedi";
        res.status(500).json({ message, error });
    }
};
