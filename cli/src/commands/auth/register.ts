import inquirer from 'inquirer';
import logger from '../../utils/logger'; 
import axios from 'axios';
import { API_URL } from '../../utils/config';

export const registerCommand = async () => {
  try {
    // Prompt for email, name, and password
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
      {
        type: 'input',
        name: 'name',
        message: 'Enter your full name:',
        validate: (input) => (input.length >= 1 ? true : 'Name must be at least 1 character long.')
      },
    ]);

    logger.info('Registering... Please wait.');

    // Make the registration API request
    const response = await axios.post(`${API_URL}/auth/register`, {
      email: answers.email,
      password: answers.password,
      name: answers.name,
    });

    if (response.data && response.data.user) {
      logger.success('Registration successful!');  
      logger.info(`Welcome, ${response.data.user.name}!`);
    } else {
      logger.error('Unexpected response structure from the server.');
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message; 
      logger.error(`An error occurred during registration: ${errorMessage}`);
    } else {
      logger.error(`An error occurred during registration: ${(error instanceof Error) ? error.message : 'Unknown error'}`);
    }
  }
};