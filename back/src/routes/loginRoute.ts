import { Router } from 'express';
import { loginController } from '../controllers/loginController';
import { validateRequest } from '../middlewares/validateRequest'; 
import { loginUserSchema } from '../schemas/userSchemas';

export const loginRoute = Router();

loginRoute.post('/', validateRequest({ body: loginUserSchema }), loginController);