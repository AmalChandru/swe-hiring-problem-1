import mongoose, { Schema, Document } from 'mongoose';
import logger from '../utils/logger';

export interface IUser extends Document {
  email: string;
  password: string; // Hashed password
  name: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

// Log when a user document is created
UserSchema.post('save', (doc: IUser) => {
  logger.info(`User created: ${doc.email}`);
});

// Log validation errors
UserSchema.post('validate', (doc: IUser) => {
  logger.error(`Validation error for user: ${doc.email}`);
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;