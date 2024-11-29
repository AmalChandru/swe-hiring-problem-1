import { ValidationChain, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger'; 

// Validation chain for user registration
export const validateRegister: ValidationChain[] = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name').optional().isString().withMessage('Name must be a string'),
];

// Error handler middleware for validation
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation errors:', errors.array());  // Log validation errors
    return res.status(400).json({ errors: errors.array() });
  }
  next();  // Proceed to the next middleware/handler
};