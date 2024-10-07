import { Request, Response } from 'express';
import { questionPackageService } from '../services/QuestionPackageService';

// Yeni soru paketi oluşturma
export const createPackage = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const newPackage = await questionPackageService.createQuestionPackage(title);
         res.status(201).json(newPackage);
    } catch (error) {
        if (error instanceof Error) {
             res.status(500).json({ message: error.message });
        }
         res.status(500).json({ message: 'An unknown error occurred' });
    }
};

// Soru ekleme
export const addQuestion = async (req: Request, res: Response) => {
    try {
        const { packageId } = req.params;
        const { question, time } = req.body;
        const updatedPackage = await questionPackageService.addQuestion(packageId, question, time);
        if (!updatedPackage) {
             res.status(404).json({ message: 'Question package not found' });
        }
         res.status(200).json(updatedPackage);
    } catch (error) {
        if (error instanceof Error) {
             res.status(500).json({ message: error.message });
        }
         res.status(500).json({ message: 'An unknown error occurred' });
    }
};

// Tüm soru paketlerini listeleme
export const getAllPackages = async (req: Request, res: Response) => {
    try {
        const packages = await questionPackageService.getAllPackages();
         res.status(200).json(packages);
    } catch (error) {
        if (error instanceof Error) {
             res.status(500).json({ message: error.message });
        }
         res.status(500).json({ message: 'An unknown error occurred' });
    }
};

// Tek bir soru paketini getirme
export const getPackageById = async (req: Request, res: Response) => {
    try {
        const { packageId } = req.params;
        const questionPackage = await questionPackageService.getPackageById(packageId);
        if (!questionPackage) {
             res.status(404).json({ message: 'Question package not found' });
        }
        res.status(200).json(questionPackage);
    } catch (error) {
        if (error instanceof Error) {
             res.status(500).json({ message: error.message });
        }
        res.status(500).json({ message: 'An unknown error occurred' });
    }
};
