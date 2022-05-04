import Joi from "joi";

export const post = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  category: Joi.string().valid('tech', 'phones').required(),
  isListed: Joi.boolean(),
});

export const signUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  character: Joi.string().required(),
});

export const signIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
