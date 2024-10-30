import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // CORS için import
import questionPackageRoutes from "./routes/QuestionPackageRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import interviewRoutes from "./routes/interviewRoutes";
import videoRoutes from "./routes/videoRoutes"; // Video route'larını ekledik

dotenv.config();

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5173"], // İzin verilen kaynaklar
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // İzin verilen HTTP yöntemleri
    credentials: true, // Kimlik bilgilerine izin ver
  })
);
app.use(express.json());

// MongoDB bağlantısı
const mongoUrl = process.env.MONGOOSE_URL as string;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("MongoDB bağlantısı başarıyla sağlandı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// API Route'ları
app.use('/api', questionPackageRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/videos', videoRoutes); // Video API route'larını ekledik

// Temel test rotası
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World from app.ts!");
});

// Sunucuyu başlat
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
});

export default app;
