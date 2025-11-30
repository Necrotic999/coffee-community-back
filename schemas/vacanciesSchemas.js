import Joi from "joi";

export const vacancySendEmailSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  surname: Joi.string().min(2).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^[\d\s+()-]+$/)
    .required(),
  recaptchaToken: Joi.string().valid("SKIP_RECAPTCHA").required(),
});
