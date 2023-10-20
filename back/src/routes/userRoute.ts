import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { createUserSchema } from '../schemas/userSchemas';
import { createUserController } from '../controllers/userController';

export const userRouter = Router();

userRouter.post('/', validateRequest({ body: createUserSchema }), createUserController);