import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import questionPackageRoutes from './routes/QuestionPackageRoutes';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow credentials to be included
}));
app.use(express.json());

// MongoDB connection
const mongoUrl = process.env.MONGOOSE_URL as string;

mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api', questionPackageRoutes);

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World from app.ts!');
});

// Start the server (you might want to add this part if you haven't already)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
