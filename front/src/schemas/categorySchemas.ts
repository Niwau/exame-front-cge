import { z } from 'zod';

export const categoryNameSchema = z
  .string()
  .min(3, 'O nome precisa conter no mínimo 3 caracteres')
  .max(255, 'O nome precisa conter no máximo 255 caracteres');

export const categoryColorSchema = z
  .string()
  .regex(/^#([0-9A-Fa-f]{3}){1,2}$/i, 'Só cores hexadecimais são permitidas')
  .optional()

export const createCategorySchema = z.object({
  name: categoryNameSchema,
  color: categoryColorSchema
});

export type CreateCategory = z.infer<typeof createCategorySchema>