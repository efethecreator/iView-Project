import { Router } from 'express';
import { createPackage, addQuestion, getAllPackages, getPackageById, deletePackage, updatePackage } from '../controllers/QuestionPackageController';

const router = Router();

// Yeni soru paketi oluşturma
router.post('/packages', createPackage);

// Soru paketi içinde soru ekleme
router.post('/packages/:packageId/questions', addQuestion);

// Tüm soru paketlerini getirme
router.get('/packages', getAllPackages);

// Tek bir soru paketini getirme
router.get('/packages/:packageId', getPackageById);

// Soru paketini güncelleme
router.put('/packages/:packageId', updatePackage);

// Soru paketini silme
router.delete('/packages/:packageId', deletePackage);

export default router;
