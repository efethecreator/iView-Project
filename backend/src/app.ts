import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import questionPackageRoutes from './routes/QuestionPackageRoutes'
// Dotenv'i yükle
dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// MongoDB ile bağlantı
const mongoUrl = process.env.MONGOOSE_URL as string;
app.use('/api', questionPackageRoutes); // Routes

mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', questionPackageRoutes);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World from app.ts!');
});

export default app;
