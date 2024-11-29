import fs from 'fs';
import path from 'path';
import logger from './logger';  

const CONFIG_PATH = path.join(process.env.HOME ? process.env.HOME : '~', '.shell-sync', 'config.json');

// Save token to the config file
export const saveToken = (token: string): void => {
  const configDir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
    logger.debug(`Created config directory: ${configDir}`);  
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ token }), { encoding: 'utf-8' });
  logger.debug('Token saved successfully.');  
};

// Retrieve token from the config file
export const getToken = (): string | null => {
  if (!fs.existsSync(CONFIG_PATH)) {
    logger.debug('Config file not found.');  
    return null;
  }
  
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, { encoding: 'utf-8' }));
  logger.debug('Token retrieved successfully.');  
  return config.token || null;
};

// Clear token from the config file
export const clearToken = (): void => {
  if (fs.existsSync(CONFIG_PATH)) {
    fs.unlinkSync(CONFIG_PATH);
    logger.debug('Token cleared successfully.');  
  } else {
    logger.debug('No token to clear.'); 
  }
};