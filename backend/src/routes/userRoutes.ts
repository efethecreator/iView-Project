import { Router } from 'express';
import { createUserController } from '../controllers/userController';

const router = Router();

// Define route for creating a user
router.post('/create', createUserController);

export default router;
