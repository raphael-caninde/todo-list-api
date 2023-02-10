import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validInputs = (schema: Joi.Schema) => (req:Request, res:Response, next:NextFunction) => {
  const { error } = schema.validate(req.body);

  if (Joi.isError(error)) {
    return res.status(401).json({ message: error.details[0].message });
  };

  next();
};

export default validInputs;
