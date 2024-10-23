import express from 'express';
import { createInterviewController, getInterviewController, getInterviewsController, deleteInterviewController } from '../controllers/interviewController';

const router = express.Router();

// POST route for creating an interview
router.post('/create', createInterviewController);

// GET route for fetching a single interview by ID
router.get('/:id', getInterviewController);

// GET route for fetching all interviews
router.get('/', getInterviewsController);

// DELETE route for deleting an interview by ID
router.delete('/delete/:id', deleteInterviewController);

export default router;
