import { Request, Response } from 'express';
import { createInterview } from '../services/interviewService';

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
  } catch (error) {
    console.error('Error creating interview:', error);
    res.status(500).json({ message: 'Failed to create interview', error });
  }
};
