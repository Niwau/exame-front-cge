import mongoose from 'mongoose';
import { UserInterface } from '../types/UserInterface';

const UserSchema = new mongoose.Schema<UserInterface>({
  email: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model('User', UserSchema);