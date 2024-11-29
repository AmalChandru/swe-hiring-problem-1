import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel'; 
import { API_SECRET } from '../../utils/config';
import logger from '../../utils/logger';  

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login attempt failed: User not found for email ${email}`);  
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      logger.warn(`Login attempt failed: Invalid password for email ${email}`);  
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, API_SECRET, { expiresIn: '1h' });
    logger.info(`User logged in successfully: ${email}`);  

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: { email: user.email, name: user.name }
    });
  } catch (error: any) {
    logger.error('Login error:', error instanceof Error ? error.message : error);  
    return res.status(500).json({ message: 'Internal server error.' });
  }
};