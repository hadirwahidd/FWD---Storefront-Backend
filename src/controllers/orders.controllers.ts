import { NextFunction, Request, Response } from 'express';
import OrderStore from '../models/order';

const store = new OrderStore();

// INDEX: All orders by user
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await store.index(req.params.id as unknown as number);
    res.json({
      message: `Orders by user ${req.params.id} retrieved successfully!`,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// GET CURRENT ORDER
export const getCurrentOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentOrder = await store.getCurrentOrder(
      req.params.id as unknown as number
    );
    res.json({
      message: 'Current Order retrieved successfully!',
      data: currentOrder
    });
  } catch (error) {
    next(error);
  }
};

// GET COMPLETED ORDERS
export const getCompletedOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const completedOrders = await store.getCompletedOrders(
      req.params.id as unknown as number
    );
    res.json({
      message: 'Completed Orders retrieved successfully!',
      data: completedOrders
    });
  } catch (error) {
    next(error);
  }
};

// ADD PRODUCT
export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order_id: string = req.params.id;
    const product_id: string = req.body.product_id;
    const quantity: number = parseInt(req.body.quantity);

    const addedProduct = await store.addProduct(quantity, order_id, product_id);
    res.json({
      message: 'Product added to your order successfully!',
      data: addedProduct
    });
  } catch (error) {
    next(error);
  }
};
