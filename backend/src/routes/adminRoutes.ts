import express from 'express';
import AdminController from '../controllers/adminController'; // Yeni controller yolu

const router = express.Router();

// Giriş Route'u
router.post('/login', AdminController.loginAdmin);

export default router;
