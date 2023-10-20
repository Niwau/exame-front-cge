import { Router } from 'express';
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoryController,
  updateCategoryController,
} from '../controllers/categoryController';
import { validateRequest } from '../middlewares/validateRequest';
import { createCategorySchema } from '../schemas/categorySchemas';
import { objectIdSchema } from '../schemas/objectSchema';

export const categoryRouter = Router();

categoryRouter.get('/', getAllCategoriesController);

categoryRouter.post('/', validateRequest({ body: createCategorySchema }), createCategoryController);

categoryRouter.put(
  '/:id',
  validateRequest({ params: { field: 'id', schema: objectIdSchema }, body: createCategorySchema }),
  updateCategoryController,
);

categoryRouter.delete(
  '/:id',
  validateRequest({ params: { field: 'id', schema: objectIdSchema } }),
  deleteCategoryController,
);

categoryRouter.get(
  '/:id',
  validateRequest({ params: { field: 'id', schema: objectIdSchema } }),
  getCategoryController
)