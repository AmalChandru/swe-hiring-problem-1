import inquirer from 'inquirer';
import logger from '../../utils/logger';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { saveTokenAndEmail } from '../../utils/tokenStorage';

/**
 * Handles user login by prompting for credentials and authenticating with the server.
 */
export const loginCommand = async () => {
  try {
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

    const response = await axios.post(`${API_URL}/auth/login`, {
      email: answers.email,
      password: answers.password,
    });

    const { token, user } = response.data;
    if (token && user) {
      logger.success('Login successful!');
      logger.info(`Welcome back, ${user.name}!`);
      saveTokenAndEmail(token, user.email);
    } else {
      logger.error('Unexpected response structure from the server.');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || (error instanceof Error ? error.message : 'Unknown error');
    logger.error(`An error occurred during login: ${errorMessage}`);
  }
};
