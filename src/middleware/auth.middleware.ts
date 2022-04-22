import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretToken = process.env.TOKEN_SECRET;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // get authHeader
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      const decoded = jwt.verify(token, secretToken as unknown as string);
      if (decoded) {
        next();
      } else {
        // token isn't valid (failed to authenticate)
        const error = 'Authentication Error. Token is not valid.';
        res.status(401);
        next(error);
      }
    } else {
      // token isn't provided in header
      const error = 'Authentication Error. Token is not provided.';
      res.status(401);
      next(error);
    }
  } catch (err) {
    const error = 'Authentication Error';
    res.status(401);
    next(error);
  }
};

export default verifyAuthToken;
