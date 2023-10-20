import { z } from "zod";
import { objectIdSchema } from "./objectSchema";

export const productNameSchema = z.string().min(3).max(255)
export const productPriceSchema = z.number().min(0)
export const productQuantitySchema = z.number().min(1)

export const createProductSchema = z.object({
  name: productNameSchema,
  price: productPriceSchema,
  quantity: productQuantitySchema,
  category: objectIdSchema,
});

export type CreateProduct = z.infer<typeof createProductSchema>