import dotenv from 'dotenv';

dotenv.config();  

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shell-sync';  
export const API_SECRET = process.env.API_SECRET || 'default_secret'; 
export const PORT = process.env.PORT || '3000'