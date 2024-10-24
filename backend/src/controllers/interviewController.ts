import { Request, Response } from 'express';
import { createInterview, getInterviewById, getAllInterviews, deleteInterviewById } from '../services/interviewService';
import mongoose from 'mongoose';

// Create Interview Controller
export const createInterviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const { title, packages, questions, expireDate, canSkip, showAtOnce } = req.body;

    if (!title || !expireDate || !packages) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // package._id'yi alarak ObjectId oluşturuyoruz
    const packageIds = packages.map((pkg: any) => new mongoose.Types.ObjectId(pkg._id));

    const interviewData = {
      title,
      packages: packageIds,  // Yalnızca ObjectId'leri alıyoruz
      questions,
      expireDate,
      canSkip,
      showAtOnce
    };

    const newInterview = await createInterview(interviewData);

    res.status(201).json({
      message: 'Interview created successfully',
      interview: newInterview
    });
  } catch (error) {
    console.error('Error creating interview:', error);
    res.status(500).json({ message: 'Failed to create interview', error });
  }
};



// Get a single interview by ID
export const getInterviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const interview = await getInterviewById(id);

    if (!interview) {
      res.status(404).json({ message: 'Interview not found' });
      return;
    }

    res.status(200).json(interview);
  } catch (error) {
    console.error('Error fetching interview:', error);
    res.status(500).json({ message: 'Failed to fetch interview', error });
  }
};

// Get all interviews
export const getInterviewsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const interviews = await getAllInterviews();
    res.status(200).json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ message: 'Failed to fetch interviews', error });
  }
};

// Delete a single interview by ID
export const deleteInterviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedInterview = await deleteInterviewById(id);

    if (!deletedInterview) {
      res.status(404).json({ message: 'Interview not found' });
      return;
    }

    res.status(200).json({
      message: 'Interview deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting interview:', error);
    res.status(500).json({ message: 'Failed to delete interview', error });
  }
};
