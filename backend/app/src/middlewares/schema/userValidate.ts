import Joi from "joi";

export const userValidation = Joi.object().keys({
  name: Joi.string().min(3).required().messages({
    'string.empty': 'O campo "nome" não pode ser vazio.',
    'string.min': 'O campo tem que ter no mínimo 3 caracteres.',
  }),
  lastName: Joi.string().min(3).required().messages({
    'string.empty': 'O campo "sobrenome" não pode ser vazio.',
    'string.min': 'O campo tem que ter no mínimo 3 caracteres.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'O campo email não pode ser vazio.',
    'string.email': '"email" deve ser um e-mail válido.',
  }),
  password: Joi.string().min(6).max(16).required().messages({
    'string.empty': 'O campo "senha" não pode ser vazio.',
    'string.min': 'A senha tem que ter no mínimo 6 caracteres.',
    'string.max': 'A senha tem que ter no máximo 16 caracteres.',
  }),
});

export const login = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.empty': 'O campo email não pode ser vazio.',
    'string.email': '"email" deve ser um e-mail válido.',
  }),
  password: Joi.string().min(6).max(16).required().messages({
    'string.empty': 'O campo "senha" não pode ser vazio.',
    'string.min': 'E-mail ou senha incorretos.',
    'string.max': 'E-mail ou senha incorretos.',
  }),
});
