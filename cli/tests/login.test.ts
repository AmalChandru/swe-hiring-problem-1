import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

describe('Login Command', () => {
  it('should execute the login command successfully', async () => {
    const { stdout, stderr } = await execPromise('npx tsc && node dist/index.js login -user valid@gmail.com --pass test@123');
    expect(stderr).toBe('');
    expect(stdout).toContain('Successfully logged in'); 
  });

  it('should return an error when credentials are invalid', async () => {
    const { stdout, stderr } = await execPromise('node dist/commands/auth/login.js --user invalid@gmail.com --pass wrong@123');
    expect(stderr).toBe('');
    expect(stdout).toContain('Invalid credentials'); 
  });
});
