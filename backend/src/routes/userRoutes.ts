import { Router } from 'express';
import { createUserController , getUserByIdController } from '../controllers/userController';

const router = Router();


router.post('/create', createUserController);
router.get('/:userId', getUserByIdController);

export default router;
