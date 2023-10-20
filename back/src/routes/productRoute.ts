import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
} from '../controllers/productController';
import { validateRequest } from '../middlewares/validateRequest';
import { createProductSchema } from '../schemas/productSchemas';
import { objectIdSchema } from '../schemas/objectSchema';

export const productRouter = Router();

productRouter.get('/', getAllProductsController);

productRouter.post('/', validateRequest({ body: createProductSchema }), createProductController);

productRouter.put(
  '/:id',
  validateRequest({ params: { field: 'id', schema: objectIdSchema }, body: createProductSchema }),
  updateProductController,
);

productRouter.delete(
  '/:id',
  validateRequest({ params: { field: 'id', schema: objectIdSchema } }),
  deleteProductController,
);

productRouter.get('/:id', validateRequest({ params: { field: 'id', schema: objectIdSchema } }), getProductController);
