import { exec } from 'child_process';
import { promisify } from 'util';
import logger from '../src/utils/logger'

const execPromise = promisify(exec);

describe('Push Command', () => {
  const executeCommand = async (command: string) => {
    try {
      const { stdout, stderr } = await execPromise(command);
      return { stdout, stderr };
    } catch (error) {
      logger.error('Command execution failed:', error);
      throw error;
    }
  };

  it('should push new shell history to the backend', async () => {
    const { stdout, stderr } = await executeCommand('node dist/commands/history/push.js');
    expect(stderr).toBe('');
    expect(stdout).toContain('Shell history pushed successfully!');
    logger.info('Shell history pushed successfully.');
  });

  it('should not push the same commands again (no duplicates)', async () => {
    const { stdout: firstPushStdout, stderr: firstPushStderr } = await executeCommand('node dist/commands/history/push.js');
    expect(firstPushStderr).toBe('');
    expect(firstPushStdout).toContain('Shell history pushed successfully!');

    const { stdout: secondPushStdout, stderr: secondPushStderr } = await executeCommand('node dist/commands/history/push.js');
    expect(secondPushStderr).toBe('');
    expect(secondPushStdout).toContain('No new commands to push.');
    logger.info('No new commands to push after second attempt.');
  });

  it('should handle errors if the user is not logged in', async () => {
    await executeCommand('node dist/commands/auth/logout.js');
    const { stdout, stderr } = await executeCommand('node dist/commands/history/push.js');
    expect(stderr).toBe('');
    expect(stdout).toContain('You must be logged in to push history.');
    logger.warn('Attempt to push history without being logged in.');
  });

  it('should handle errors when server fails to respond', async () => {
    const { stdout, stderr } = await executeCommand('node dist/commands/history/push.js');
    expect(stderr).toBe('');
    expect(stdout).toContain('Failed to push shell history.');
    logger.error('Failed to push shell history due to server error.');
  });
});
