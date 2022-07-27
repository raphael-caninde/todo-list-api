import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    jwt.verify(token, process.env.JWT_SECRET as string, (error, _decoded) => {
      if (error) {
        return res.status(401).json({ message: error.message });
      }
    });

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkToken;
