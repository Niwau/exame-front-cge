import { z } from 'zod';

export const productNameSchema = z
  .string()
  .min(3, 'O nome do produto precisa conter no mínimo 3 caracteres')
  .max(255, 'O nome do produto precisa conter no máximo 255 caracteres');

export const productPriceSchema = z.number({ invalid_type_error: 'Insira um valor válido' }).min(0, 'O preço do produto precisa ser no mínimo 0')

export const productQuantitySchema = z.number({ invalid_type_error: 'Insira um valor válido' }).min(1, 'Você precisa inserir pelo menos 1 produto')

export const categoryIdSchema = z.string().min(1, 'Campo obrigatório');

export const createProductSchema = z.object({
  name: productNameSchema,
  price: productPriceSchema,
  quantity: productQuantitySchema,
  category: categoryIdSchema
});

export type CreateProduct = z.infer<typeof createProductSchema>;
