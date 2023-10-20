import { z } from 'zod';

export const categoryNameSchema = z.string().min(3).max(255);
export const categoryColorSchema = z
  .string()
  .regex(/^#([0-9A-Fa-f]{3}){1,2}$/i, 'Invalid hex color.')
  .optional();

export const createCategorySchema = z.object({
  name: categoryNameSchema,
  color: categoryColorSchema,
});
