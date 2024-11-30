import mongoose, { Schema, Document } from 'mongoose';
import logger from '../utils/logger';

/**
 * Interface representing a User document in MongoDB.
 */
export interface IUser extends Document {
  email: string;
  password: string; // Hashed password
  name: string;
  history: string[];
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  history: { type: [String], default: [] },
});

/**
 * Logs when a user document is created.
 */
UserSchema.post<IUser>('save', (doc) => {
  logger.info(`User created: ${doc.email}`);
});

/**
 * Logs validation errors.
 */
UserSchema.post<IUser>('validate', (error: any, doc: any, next: any) => {
  logger.error(`Validation error for user: ${doc.email}`);
  next(error);
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;