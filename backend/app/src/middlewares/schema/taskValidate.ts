import Joi from "joi";

export const inputTask = Joi.object().keys({
  task: Joi.string().required().messages({
    'string.empty': 'O campo não pode ser vazio.',
  }),
});
