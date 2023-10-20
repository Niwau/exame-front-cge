import { Request, Response } from 'express';
import { Product } from '../models/productModel';
import { createResponse } from '../utils/response';
import { Category } from '../models/categoryModel';
import { CreateProduct } from '../schemas/productSchemas';

export const createProductController = async (req: Request, res: Response) => {
  const product = req.body as CreateProduct;
  const category = await Category.findById({ _id: product.category });

  if (!category) {
    return res.status(401).json(createResponse('Invalid category.'));
  }

  const foundProduct = await Product.findOne({ name: product.name });

  if (foundProduct) {
    return res.status(401).json(createResponse('Product already exists.'));
  }

  const createdProduct = await new Product(product).save();
  return res.status(201).json(createdProduct);
};

export const getAllProductsController = async (req: Request, res: Response) => {
  const products = await Product.find().populate('category');
  return res.status(200).json(products);
};

export const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = req.body as CreateProduct;
  const category = await Category.findById(product.category);

  if (!category) {
    return res.status(401).json(createResponse('Invalid category.'));
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, product);

  if (!updatedProduct) {
    return res.status(404).json(createResponse('Product not found.'));
  }

  return res.status(200).json(updatedProduct);
};

export const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return res.status(404).json(createResponse('Product not found.'));
  }

  return res.status(200).json(deletedProduct);
};

export const getProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('category');
  return res.status(200).json(product);
};
