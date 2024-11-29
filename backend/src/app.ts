import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import { MONGO_URI, PORT } from './utils/config';
import logger from './utils/logger';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the auth routes for handling authentication-related endpoints
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req: Request, res: Response): void => {
  res.send('Shell-Sync Backend is up and running');
});

// Start the server and connect to MongoDB
const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('MongoDB connected');

    app.listen(PORT, () => {
      logger.info('Server is running at port:', PORT);
    });
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error instanceof Error ? error.message : error); 
    process.exit(1);
  }
};

// Initialize the server
startServer();