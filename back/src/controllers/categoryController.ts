import { Request, Response } from 'express';
import { CategoryInterface } from '../types/CategoryInterface';
import { Category } from '../models/categoryModel';
import { createResponse } from '../utils/response';

export const createCategoryController = async (req: Request, res: Response) => {
  const category = req.body as CategoryInterface;
  const foundCategory = await Category.findOne({ name: category.name });

  if (foundCategory) {
    return res.status(401).json(createResponse('Category already exists.'));
  }

  const createdCategory = await new Category(category).save();
  return res.status(201).json(createdCategory);
};

export const getAllCategoriesController = async (req: Request, res: Response) => {
  const categories = await Category.find();
  return res.status(200).json(categories);
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    return res.status(404).json(createResponse('Category not found.'));
  }

  return res.status(200).json(deletedCategory);
};

export const updateCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = req.body as CategoryInterface;

  const updatedCategory = await Category.findByIdAndUpdate(id, category);

  if (!updatedCategory) {
    return res.status(404).json(createResponse('Category not found.'));
  }

  return res.status(200).json(updatedCategory);
};

export const getCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  return res.status(200).json(category);
};
