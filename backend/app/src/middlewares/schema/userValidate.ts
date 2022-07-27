import Joi from "joi";

const userValidation = Joi.object().keys({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).required(),
});

const login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).required(),
});

export {
  userValidation,
  login,
};
