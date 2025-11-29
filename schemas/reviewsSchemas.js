import Joi from "joi";

export const reviewAddSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().min(4).max(500).required(),
  recaptchaToken: Joi.string().required().valid("SKIP_RECAPTCHA").messages({
    "any.only":
      "Невірний reCAPTCHA токен (для тесту використовуйте SKIP_RECAPTCHA)",
  }),
});
