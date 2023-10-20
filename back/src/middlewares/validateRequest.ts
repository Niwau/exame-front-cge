import { NextFunction, Request, Response } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { createResponse } from '../utils/response';

interface ValidateRequestParams {
  body?: ZodSchema
  params?: { field: string, schema: ZodSchema }
}

export const validateRequest = ({ body, params }: ValidateRequestParams) => (req: Request, res: Response, next: NextFunction) => {
  try {
    params?.schema.parse(req.params[params.field]);
    body?.parse(req.body);
    next();
  } catch (error) {
    const { formErrors } = error as ZodError;
    return res.status(400).json(createResponse(formErrors));
  }
};
