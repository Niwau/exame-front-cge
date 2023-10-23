import jwt from 'jsonwebtoken';

export const createJWT = (email: string) => {
  return jwt.sign(email, process.env.SECRET!);
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.SECRET!);
};
