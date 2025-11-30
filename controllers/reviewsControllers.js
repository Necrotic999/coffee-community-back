import * as reviewsServices from "../services/reviewsServices.js";
import axios from "axios";
import "dotenv/config";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const getAll = async (req, res, next) => {
  try {
    const result = await reviewsServices.getAllReviws();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { recaptchaToken, name, review, rating } = req.body;

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const response = await axios.post(verifyUrl, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      },
    });

    const { success, score } = response.data;

    if (!success || score < 0.5) {
      throw HttpError(400, "Виглядаєте як робот, спробуйте ще раз");
    }

    const result = await reviewsServices.addReview({
      name,
      review,
      rating,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  add,
};
