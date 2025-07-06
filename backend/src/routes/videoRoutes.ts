import express from "express";
import { getVideoById, uploadVideo, deleteVideo, updateInterviewVideos } from "../controllers/videoController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();


router.get("/:interviewId", getVideoById);


router.post("/", upload.single("file"), uploadVideo);


router.delete("/:id", deleteVideo);

router.put("/", updateInterviewVideos)

export default router;