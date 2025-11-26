import express from "express";
import reviewsControllers from "../controllers/reviewsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import { reviewAddSchema } from "../schemas/reviewsSchemas.js";
import validateBody from "../helpers/validateBody.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", reviewsControllers.getAll);

reviewsRouter.post(
  "/",
  isEmptyBody,
  validateBody(reviewAddSchema),
  reviewsControllers.add
);

export default reviewsRouter;
