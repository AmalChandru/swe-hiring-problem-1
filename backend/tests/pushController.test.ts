import request from 'supertest';
import { app } from '../src/app';
import mongoose from 'mongoose';
import User from '../src/models/userModel';
import bcrypt from 'bcryptjs';
import logger from '../src/utils/logger';

describe('POST /api/push', () => {
  let user: any;
  const validPassword = 'password123';
  const validHistory = ['echo "Hello"', 'ls -la'];

  beforeAll(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/shell-sync-test');
      const hashedPassword = await bcrypt.hash(validPassword, 10);
      user = new User({
        email: 'test@example.com',
        name: 'Test User',
        password: hashedPassword
      });
      await user.save();
      logger.info('Test user created and database connected.');
    } catch (error) {
      logger.error('Error setting up test environment:', error);
    }
  });

  afterAll(async () => {
    try {
      await User.deleteMany({});
      await mongoose.connection.close();
      logger.info('Test database cleaned and connection closed.');
    } catch (error) {
      logger.error('Error cleaning up test environment:', error);
    }
  });

  it('should push history successfully if user is authenticated', async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: validPassword });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/api/push')
      .set('Authorization', `Bearer ${token}`)
      .send({ history: validHistory });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Shell history pushed successfully!');
    logger.info('Authenticated user pushed history successfully.');
  });

  it('should return 401 if user is not authenticated', async () => {
    const response = await request(app)
      .post('/api/push')
      .send({ history: validHistory });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized: Please login to push history.');
    logger.warn('Unauthorized attempt to push history.');
  });

  it('should return 400 if history is empty or invalid', async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: validPassword });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/api/push')
      .set('Authorization', `Bearer ${token}`)
      .send({ history: [] });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('History is required and should be an array.');
    logger.warn('Attempt to push invalid or empty history.');
  });
});