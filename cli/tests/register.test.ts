import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

describe('Register Command', () => {
  it('should register a new user successfully', async () => {
    const { stdout, stderr } = await execPromise('node dist/commands/auth/register.js --user newuser@gmail.com --pass newpassword');
    expect(stderr).toBe('');
    expect(stdout).toContain('Successfully registered'); 
  });

  it('should return an error if username already exists', async () => {
    const { stdout, stderr } = await execPromise('node dist/commands/auth/register.js --user existinguser@gmail.com --pass password');
    expect(stderr).toBe('');
    expect(stdout).toContain('User already exists'); 
  });
});
