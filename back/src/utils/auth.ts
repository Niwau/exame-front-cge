import jwt from 'jsonwebtoken';
import { SECRET } from '../constants';

export const createJWT = (email: string) => {
  return jwt.sign(email, SECRET);
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, SECRET);
};
