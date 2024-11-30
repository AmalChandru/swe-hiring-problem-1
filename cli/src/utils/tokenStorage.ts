import fs from 'fs';
import path from 'path';
import logger from '../utils/logger'

const CONFIG_PATH = path.join(process.env.HOME || '~', '.shell-sync', 'config.json');

/**
 * Saves the token and email to the configuration file.
 * @param token - The authentication token.
 * @param email - The user's email address.
 */
export const saveTokenAndEmail = (token: string, email: string): void => {
  const configDir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
    logger.debug(`Created config directory: ${configDir}`);
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ token, email }), { encoding: 'utf-8' });
  logger.debug('Token and email saved successfully.');
};

/**
 * Retrieves the token and email from the configuration file.
 * @returns An object containing the token and email, or null if not found.
 */
export const getTokenAndEmail = (): { token: string | null, email: string | null } => {
  if (!fs.existsSync(CONFIG_PATH)) {
    logger.debug('Config file not found.');
    return { token: null, email: null };
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, { encoding: 'utf-8' }));
  logger.debug('Token and email retrieved successfully.');
  return { token: config.token || null, email: config.email || null };
};

/**
 * Clears the token and email from the configuration file.
 */
export const clearTokenAndEmail = (): void => {
  if (fs.existsSync(CONFIG_PATH)) {
    fs.unlinkSync(CONFIG_PATH);
    logger.debug('Token and email cleared successfully.');
  } else {
    logger.debug('No token or email to clear.');
  }
};

/**
 * Checks if the user is logged in by verifying the presence of a valid token and email.
 * @returns A promise that resolves to true if logged in, otherwise false.
 */
export const isLoggedIn = async (): Promise<boolean> => {
  const { token, email } = getTokenAndEmail();
  return Boolean(token?.trim() && email?.trim());
};
