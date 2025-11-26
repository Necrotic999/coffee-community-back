import Joi from "joi";

export const reviewAddSchema = Joi.object({
  name: Joi.string().required(),
  rating: Joi.number().required(),
  message: Joi.string().required(),
});
