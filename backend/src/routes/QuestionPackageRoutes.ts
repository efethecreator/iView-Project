import { Router } from 'express';
import { createPackage, addQuestion, getAllPackages, getPackageById, deletePackage, updatePackage, deleteQuestion  } from '../controllers/QuestionPackageController';

const router = Router();


router.post('/packages', createPackage);
router.post('/packages/:packageId/questions', addQuestion);
router.get('/packages', getAllPackages);
router.get('/packages/:packageId', getPackageById);
router.put('/packages/:packageId', updatePackage);
router.delete('/packages/:packageId', deletePackage);
router.delete('/packages/:packageId/questions/:questionId', deleteQuestion);

export default router;
