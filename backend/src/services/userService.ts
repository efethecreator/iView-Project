import User, { IUserInput } from '../models/userModel'; 

export const createUser = async (userData: IUserInput): Promise<IUserInput> => {
  const user = new User(userData);
  return await user.save();
};
