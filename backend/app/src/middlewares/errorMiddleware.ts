import { Request, Response, NextFunction } from 'express';
import CustomError from './errors/customError';

export default function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
  if(err instanceof CustomError) {
      return res.status(err.statusCode).json({ message: err.message });
  }

  console.log(err);
  return res.status(500).json({ message: 'Internal Error' });
}
