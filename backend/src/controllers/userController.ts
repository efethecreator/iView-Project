import { Request, Response } from 'express';
import { createUser } from '../services/userService';
import { IUserInput } from '../models/userModel'; // Import new interface

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, surname, email, phone, videoUrl, status, note } = req.body;

    // Constructing user data with IUserInput type
    const userData: IUserInput = {
      name,
      surname,
      email,
      phone,
      videoUrl,
      status,
      note
    };

    // Create user by calling service
    const newUser = await createUser(userData);

    res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user', error });
  }
};
