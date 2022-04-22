import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserStore, { User } from '../models/user';

dotenv.config();

const secretToken = process.env.TOKEN_SECRET;

const store = new UserStore();

// INDEX
export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await store.index();
    res.json({
      message: 'Users retrieved successfully!',
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// SHOW
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await store.show(req.params.id as unknown as string);
    const token = jwt.sign({ user: user }, secretToken as unknown as string);
    res.json({
      message: 'User retrieved successfully!',
      data: user,
      token: token
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
    const user: User = {
      email: req.body.email,
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password
    };
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, secretToken as unknown as string);
    res.json({
      message: 'User created successfully!',
      data: newUser,
      token: token
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = {
      email: req.body.email,
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      id: req.params.id as unknown as string
    };
    const updatedUser = await store.update(user);
    const token = jwt.sign(
      { user: updatedUser },
      secretToken as unknown as string
    );
    res.json({
      message: 'User updated successfully!',
      data: updatedUser,
      token: token
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
export const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await store.delete(req.params.id as unknown as string);
    res.json({
      message: 'User deleted successfully!',
      data: deletedUser
    });
  } catch (error) {
    next(error);
  }
};

// AUTHENTICATE
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = {
      user_name: req.body.user_name,
      password: req.body.password
    };
    const process = await store.authenticate(user);
    const token = jwt.sign({ user: process }, secretToken as unknown as string);
    if (!process) {
      return res
        .status(401)
        .send('Username and Password do not match. Try again.');
    }
    res.json({
      message: 'User authenticated successfully',
      data: process,
      token: token
    });
  } catch (error) {
    next(error);
  }
};
