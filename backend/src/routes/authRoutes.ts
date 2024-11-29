import express, { Request, Response } from 'express';
import { loginUser } from '../controllers/authController/loginController';
import { registerUser } from '../controllers/authController/registerController'; 
import logger from '../utils/logger';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    await registerUser(req, res);
    logger.info('User registered successfully');  
  } catch (error) {
    logger.error('Registration error:', error instanceof Error ? error.message : error);
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    await loginUser(req, res);
    logger.info('User logged in successfully');  
  } catch (error) {
    logger.error('Login error:', error instanceof Error ? error.message : error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
});

export default router;