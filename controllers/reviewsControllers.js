import * as reviewsServices from "../services/reviewsServices.js";

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
    const result = await reviewsServices.addReview(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  add,
};
