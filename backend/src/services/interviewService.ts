import Interview, { IInterview } from '../models/interviewModel'; 


export const createInterview = async (data: Partial<IInterview>): Promise<IInterview> => {
  const interviewData = {
    ...data,
    users: [] 
  };

  const interview = new Interview(interviewData);
  return await interview.save(); 
};


export const getInterviewById = async (id: string): Promise<IInterview | null> => {
  return await Interview.findById(id).populate('packages').populate('users');
};


export const getAllInterviews = async (): Promise<IInterview[]> => {
  return await Interview.find().populate('packages').populate('users');
};


export const deleteInterviewById = async (id: string): Promise<IInterview | null> => {
  return await Interview.findByIdAndDelete(id);
};