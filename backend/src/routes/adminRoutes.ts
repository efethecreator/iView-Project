import express from 'express';
import AdminController from '../controllers/adminController'; 

const router = express.Router();


router.post('/login', AdminController.loginAdmin);

router.post('/logout', AdminController.logoutAdmin);


export default router;
