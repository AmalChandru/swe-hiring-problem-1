import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { API_SECRET } from '../utils/config';
import logger from '../utils/logger';  // Import the centralized logger

export const authMiddleware = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    logger.warn('No token provided');  // Log missing token
    return res.status(403).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, API_SECRET);
    //req.user = decoded; 
    //logger.info(`User authenticated: ${decoded.email}`);  // Log successful authentication
    next();
  } catch (error) {
    logger.error('Invalid token:', error instanceof Error ? error.message : error);  // Log invalid token error
    return res.status(401).json({ message: 'Invalid token.' });
  }
};