import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { UnauthorizedError } from './errors/ApiErrors';

type JwtPayload = {
	id: number;
  callback: (error: Error) => void;
}

const prisma = new PrismaClient();

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) return res.status(401).json({ message: 'Token not found' });

    const [, token] = accessToken.split(' ');

    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id
      },
    });

    //console.log(user);

    if (!user) throw new UnauthorizedError('User not found');

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default checkToken;
