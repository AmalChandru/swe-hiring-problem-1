import User from '../models/userModel';
import logger from '../utils/logger';

/**
 * Saves the user's shell history to the MongoDB database.
 * @param email - The user's email address.
 * @param history - An array of shell commands to save.
 */
export const saveHistoryToDb = async (email: string, history: string[]): Promise<void> => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    user.history = [...user.history, ...history];
    await user.save();
    logger.info(`History saved for user: ${email}`);
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Failed to save history for user ${email}: ${errorMessage}`);
    throw new Error(`Failed to save history: ${errorMessage}`);
  }
};
