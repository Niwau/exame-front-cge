import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { CreateUser } from '../schemas/userSchemas';
import { createResponse } from '../utils/response';
import { hashPassword } from '../utils/hash';

export const createUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body as CreateUser;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(401).json(createResponse('User already exists.'));
  }

  await new User({ email, password: await hashPassword(password) }).save();
  return res.status(201).json(createResponse('User created.'));
};