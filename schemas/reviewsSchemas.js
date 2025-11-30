import Joi from "joi";

export const reviewAddSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().min(4).max(500).required(),
  recaptchaToken: Joi.string().required().messages({
    "any.required": "reCAPTCHA токен обов'язковий",
    "string.min": "Невірний reCAPTCHA токен",
  }),
});
