import { NextFunction, Request, Response } from 'express';
import { createResponse } from '../utils/response';
import { verifyJWT } from '../utils/auth';

export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.url == '/login' || (req.url == '/users' && req.method == 'POST')) {
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json(createResponse('Token not found.'));
  }

  try {
    verifyJWT(token);
    next();
  } catch (error) {
    return res.status(401).json(createResponse('Invalid token.'));
  }
};
