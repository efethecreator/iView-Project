import { Router } from 'express';
import { createInterviewController, getInterviewController, getInterviewsController, deleteInterviewController, GetInterviewQuestions } from '../controllers/interviewController';

const router = Router();


router.get('/:id/questions', GetInterviewQuestions); 
router.post('/create', createInterviewController);
router.get('/:id', getInterviewController);
router.get('/', getInterviewsController);
router.delete('/delete/:id', deleteInterviewController);

export default router;