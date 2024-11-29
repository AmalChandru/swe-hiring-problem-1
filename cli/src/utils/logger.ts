import pino from 'pino';
import { createWriteStream } from 'fs';
import path from 'path';
import fs from 'fs';
import { red, green, yellow, cyan, white, magenta } from 'colorette';

// Create the logs directory path
const logsDir = path.join(process.env.HOME ? process.env.HOME : '~', '.shell-sync', 'logs');
const logFilePath = path.join(logsDir, 'app.log');
const logStream = createWriteStream(logFilePath, { flags: 'a' });

// Ensure the logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create Pino logger for file logging (debug level)
const fileLogger = pino(
  {
    level: 'debug', 
  },
  logStream // Write logs to the file
);

// Custom function to log to console using colorette for colors
const consoleLogger = (message: string, level: string) => {
  switch (level) {
    case 'shell-sync':
      console.warn(magenta(`${message}`));
      break;
    case 'info':
      console.log(cyan(`[INFO] ${message}`)); 
      break;
    case 'error':
      console.error(red(`[ERROR] ${message}`)); 
      break;
    case 'success':
      console.log(green(`[SUCCESS] ${message}`)); 
      break;
    case 'warn':
      console.warn(yellow(`[WARN] ${message}`)); 
      break;
    default:
      console.log(white(message)); 
      break;
  }
};

// Combine file and console logging
const logger = {
  "shell-sync": (message: string) => {
    consoleLogger(message, 'shell-sync');
  }, 
  info: (message: string) => {
    fileLogger.info(message);  
    consoleLogger(message, 'info');  
  },
  error: (message: string) => {
    fileLogger.error(message);  
    consoleLogger(message, 'error'); 
  },
  success: (message: string) => {
    fileLogger.info(message);  
    consoleLogger(message, 'success');  
  },
  warn: (message: string) => {
    fileLogger.warn(message);  
    consoleLogger(message, 'warn');  
  },
  debug: (message: string) => {
    fileLogger.debug(message);  
  },
};

export default logger;
