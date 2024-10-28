import Interview, { IInterview } from '../models/interviewModel'; // Importing Interview model

// Create a new interview
export const createInterview = async (data: Partial<IInterview>): Promise<IInterview> => {
  const interviewData = {
    ...data,
    interviewLink: '', // This will be automatically filled by the schema (UUIDv4)
    users: [] // Empty users array
  };

  const interview = new Interview(interviewData);
  return await interview.save(); // Save the interview to the database
};
