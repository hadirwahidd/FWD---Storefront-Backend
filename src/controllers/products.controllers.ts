import { NextFunction, Request, Response } from 'express';
import ProductStore, { Product } from '../models/product';

const store = new ProductStore();

// Index
export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await store.index();
    res.json({
      message: `Products are retrieved successfully!`,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// GET BY CATEGORY
export const getByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await store.getByCategory(
      req.params.category as unknown as string
    );
    res.json({
      message: `Products by category ${req.params.category} are retrieved successfully!`,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// SHOW
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await store.show(req.params.id as unknown as string);
    res.json({
      message: 'Product retrieved successfully!',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// CREATE
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    const newProduct = await store.create(product);
    res.json({
      message: 'Product created successfully!',
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};
