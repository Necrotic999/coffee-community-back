import * as reviewsServices from "../services/reviewsServices.js";
import axios from "axios";

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

    if (recaptchaToken === "SKIP_RECAPTCHA") {
      console.log("RECAPTCHA is skipped(test mode)");
    } else {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
      const response = await axios.post(verifyUrl, null, {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      });

      const { success, score } = response.data;

      if (!success || score < 0.5) {
        return res
          .status(400)
          .json({ message: "Виглядаєте як робот. Спробуйте ще раз." });
      }
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
