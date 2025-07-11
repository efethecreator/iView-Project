import { Request, Response } from 'express';
import { questionPackageService } from '../services/QuestionPackageService';


const deleteQuestion = async (req: Request, res: Response) => {
     try {
       const { packageId, questionId } = req.params;
       const updatedPackage = await questionPackageService.deleteQuestionFromPackage(packageId, questionId);
   
       if (!updatedPackage) {
         res.status(404).json({ message: 'Question or package not found' });
       }
   
       res.status(200).json(updatedPackage);
     } catch (error) {
       res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
     }
   };
   
   export { deleteQuestion };
    



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

export const addQuestion = async (req: Request, res: Response) => {
    try {
        const { packageId } = req.params;
        const { question, time } = req.body;
        const updatedPackage = await questionPackageService.addQuestion(packageId, question, time);
        if (!updatedPackage) {
            res.status(404).json({ message: 'Question package not found' });
        } else {
            res.status(200).json(updatedPackage);
        }
    } catch (error) {
        console.error('Error in addQuestion:', error);
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};





export const getAllPackages = async (_: Request, res: Response) => {
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


export const updatePackage = async (req: Request, res: Response) => {
     try {
         const { packageId } = req.params;
         const { title, questions } = req.body;
 
         const updatedPackage = await questionPackageService.updatePackage(packageId, title, questions);
         if (!updatedPackage) {
              res.status(404).json({ message: 'Question package not found' });
         }
          res.status(200).json(updatedPackage);
     } catch (error) {
          res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
     }
 };
 


export const deletePackage = async (req: Request, res: Response) => {
    try {
        const { packageId } = req.params;
        const deletedPackage = await questionPackageService.deletePackage(packageId);
        if (!deletedPackage) {
             res.status(404).json({ message: 'Question package not found' });
        }
        res.status(204).send(); 
    } catch (error) {
        if (error instanceof Error) {
             res.status(500).json({ message: error.message });
        } else {
             res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
