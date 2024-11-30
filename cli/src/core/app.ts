import { initDb } from '../utils/sqlite';
import { Command } from 'commander';
import { loginCommand } from '../commands/auth/login';
import { registerCommand } from '../commands/auth/register';
import { pushCommand } from '../commands/history/push';
import logger from '../utils/logger';
import inquirer from 'inquirer';
import { isLoggedIn } from '../utils/tokenStorage';

export const createApp = () => {
  logger['shell-sync']('shell-sync 🛸: secure shell history, anywhere :)');
  const program = new Command();

  initDb();

  program
    .name('shell-sync')
    .description('CLI tool to sync shell history across devices.')
    .version('1.0.0');

  program
    .command('start')
    .description('Start the CLI, choose an action.')
    .action(async () => {
      let loggedIn = await isLoggedIn();

      while (true) {
        const choices = loggedIn ? ['Push', 'Logout'] : ['Login', 'Register'];

        const { action } = await inquirer.prompt([
          {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices,
          },
        ]);

        logger.info(`User selected action: ${action}`);

        switch (action) {
          case 'Login':
            await loginCommand();
            loggedIn = await isLoggedIn();
            break;
          case 'Register':
            await registerCommand();
            break;
          case 'Push':
            if (!loggedIn) {
              logger.error('Please log in to perform this action.');
            } else {
              await pushCommand();
            }
            break;
          case 'Logout':
            logger.info('Logged out successfully.');
            loggedIn = false;
            break;
          default:
            logger.warn('Unknown action selected.');
        }
      }
    });

  program
    .command('login')
    .description('Log in to your Shell-Sync account.')
    .action(async () => {
      logger.info('Login command initiated.');
      await loginCommand();
    });

  program
    .command('register')
    .description('Register a new Shell-Sync account.')
    .action(async () => {
      logger.info('Register command initiated.');
      await registerCommand();
    });

  program
    .command('push')
    .description('Push your shell history to the server.')
    .action(async () => {
      const loggedIn = await isLoggedIn();
      if (!loggedIn) {
        logger.error('You must log in before using this command.');
        return;
      }
      logger.info('Push command initiated.');
      await pushCommand();
    });
  
  program.parse(process.argv);
};
