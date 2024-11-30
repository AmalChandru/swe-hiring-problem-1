import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload as CustomJwtPayload } from '../types/jwtPayload';
import { API_SECRET } from '../utils/config';
import logger from '../utils/logger';

/**
 * Middleware to authenticate JWT tokens in incoming requests.
 * Attaches the decoded user information to the request object if valid.
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    logger.warn('No token provided');
    res.status(403).json({ message: 'No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, API_SECRET) as CustomJwtPayload;
    req.user = decoded;
    logger.info(`User authenticated: ${decoded.email}`);
    next();
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Invalid token: ${errorMessage}`);
    res.status(401).json({ message: 'Invalid token.' });
  }
};
