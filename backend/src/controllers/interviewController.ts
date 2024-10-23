import { Request, Response } from 'express';
import { createInterview, getInterviewById, getAllInterviews, deleteInterviewById } from '../services/interviewService';

// Create Interview Controller
// Create Interview Controller
export const createInterviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, packages, questions, expireDate, canSkip, showAtOnce } = req.body;



    const interviewData = {
      title,
      packages,
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
  } catch (error: any) {
    console.error('Error creating interview:', error.message || error);
    res.status(500).json({ message: 'Failed to create interview', error: error.message || error });
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