import { Command } from 'commander';
import { loginCommand } from '../commands/auth/login';
import { registerCommand } from '../commands/auth/register';
import logger from '../utils/logger';  
import inquirer from 'inquirer';

export const createApp = () => {
  logger['shell-sync']('shell-sync 🛸: secure shell history, anywhere :)');
  const program = new Command();

  program
    .name('shell-sync')
    .description('CLI tool to sync shell history across devices.')
    .version('1.0.0');

  // Interactive Menu to choose login or register
  program
    .command('start')
    .description('Start the CLI, choose login or registration.')
    .action(async () => {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: ['Login', 'Register'],
        },
      ]);

      logger.info(`User selected action: ${answers.action}`);  

      if (answers.action === 'Login') {
        await loginCommand();  
      } else {
        await registerCommand();  
      }
    });

  // Direct login command
  program
    .command('login')
    .description('Log in to your Shell-Sync account.')
    .action(async () => {
      logger.info('Login command initiated.');  
      await loginCommand();  
    });

  // Direct register command
  program
    .command('register')
    .description('Register a new Shell-Sync account.')
    .action(async () => {
      logger.info('Register command initiated.');  
      await registerCommand();  
    });

  program.parse(process.argv);
};