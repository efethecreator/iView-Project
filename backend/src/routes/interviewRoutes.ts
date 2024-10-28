import express, { Request, Response } from 'express';
import { createInterviewController } from '../controllers/interviewController';

const router = express.Router();

router.post('/create', (req: Request, res: Response) => createInterviewController(req, res));

export default router;
