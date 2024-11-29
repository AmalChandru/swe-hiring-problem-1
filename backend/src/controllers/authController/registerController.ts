import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel';
import { API_SECRET } from '../../utils/config';
import logger from '../../utils/logger';  

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, name } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Registration attempt failed: User already exists for email ${email}`);  
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    // Save the user in the database
    await newUser.save();
    logger.info(`User registered successfully: ${email}`);  

    // Return success response with the token
    const token = jwt.sign({ userId: newUser._id }, API_SECRET, { expiresIn: '1h' });  // Generate JWT token
    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
      user: { email: newUser.email, name: newUser.name },
    });
  } catch (error: any) {
    logger.error('Registration error:', error instanceof Error ? error.message : error); 
    return res.status(500).json({ message: 'Internal server error.' });
  }
};