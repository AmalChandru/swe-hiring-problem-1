import { Request, Response } from 'express';
import { saveHistoryToDb } from '../utils/history';
import logger from '../utils/logger';

/**
 * Controller to handle pushing shell history to the database.
 */
export const pushHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { history, email } = req.body;

    if (!Array.isArray(history)) {
      logger.warn('Invalid history format');
      res.status(400).json({ message: 'History is required and should be an array.' });
      return;
    }

    if (!req.user) {
      logger.warn('Unauthorized access attempt');
      res.status(401).json({ message: 'Unauthorized: Please login to push history.' });
      return;
    }

    await saveHistoryToDb(email, history);
    logger.info(`History pushed successfully for user: ${email}`);

    res.status(200).json({ message: 'History pushed successfully' });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Failed to push history: ${errorMessage}`);
    res.status(500).json({ message: `Internal server error: ${errorMessage}` });
  }
};