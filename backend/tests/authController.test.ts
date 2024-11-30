import request from 'supertest';
import { app } from '../src/app'; // Import the app
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/userModel'; // Import the User model

describe('POST /api/auth/login', () => {
  let user: any; // The user to be used for tests
  const validPassword = 'password123';

  beforeAll(async () => {
    // Connect to MongoDB before tests
    await mongoose.connect('mongodb://localhost:27017/shell-sync-test');

    // Create a user for testing
    const hashedPassword = await bcrypt.hash(validPassword, 10);
    user = new User({
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword
    });
    await user.save();
  });

  afterAll(async () => {
    // Clean up and close the DB connection after tests
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should successfully login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')  // Use the route directly
      .send({
        email: 'test@example.com',
        password: validPassword
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  it('should fail when user is not found', async () => {
    const response = await request(app)
      .post('/api/auth/login')  // Use the route directly
      .send({
        email: 'nonexistent@example.com',
        password: validPassword
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials.');
  });

  it('should fail when password is incorrect', async () => {
    const response = await request(app)
      .post('/api/auth/login')  // Use the route directly
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials.');
  });
});
