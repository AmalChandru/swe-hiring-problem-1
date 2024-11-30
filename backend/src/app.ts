import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import pushRoutes from './routes/pushRoute';
import { MONGO_URI, PORT } from './utils/config';
import logger from './utils/logger';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);

// Push routes
app.use('/api', pushRoutes);

// Health check route
app.get('/', (req: Request, res: Response): void => {
  res.send('Shell-Sync Backend is up and running');
});

/**
 * Starts the server and connects to MongoDB.
 */
const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('MongoDB connected');

    app.listen(PORT, () => {
      logger.info(`Server is running at port: ${PORT}`);
    });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Failed to connect to MongoDB: ${errorMessage}`);
    process.exit(1);
  }
};

// Initialize the server
startServer();

// Export the app for testing purposes
export { app };