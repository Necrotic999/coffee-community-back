import express from "express";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import { vacancySendEmailSchema } from "../schemas/vacanciesSchemas.js";
import { sendEmail } from "../controllers/vacanciesControllers.js";

const vacanciesRouter = express.Router();

vacanciesRouter.post(
  "/",
  isEmptyBody,
  validateBody(vacancySendEmailSchema),
  sendEmail
);

export default vacanciesRouter;
