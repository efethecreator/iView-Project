import express from 'express';
import { createInterviewController } from '../controllers/interviewController';

const router = express.Router();

// POST route for creating an interview
router.post('/create', createInterviewController);

export default router;
