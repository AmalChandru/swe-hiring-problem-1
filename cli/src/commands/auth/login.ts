import inquirer from 'inquirer';
import logger from '../../utils/logger';  
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { saveToken } from '../../utils/tokenStorage';

export const loginCommand = async () => {
  try {
    // Prompt for email and password
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email:',
        validate: (input) => (input.includes('@') ? true : 'Please enter a valid email address.'),
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        mask: '*',
        validate: (input) => (input.length >= 6 ? true : 'Password must be at least 6 characters long.'),
      },
    ]);

    logger.info('Logging in... Please wait.');

    // Make the login API request
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: answers.email,
      password: answers.password,
    });

    if (response.data.token && response.data.user) {
      logger.success('Login successful!');
      logger.info(`Welcome back, ${response.data.user.name}!`);
      
      // Save token for future CLI use
      saveToken(response.data.token);
    } else {
      logger.error('Unexpected response structure from the server.');
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      logger.error(`An error occurred during login: ${errorMessage}`);
    } else {
      logger.error(`An error occurred during login: ${(error instanceof Error) ? error.message : 'Unknown error'}`);
    }
  }
};
