import express from "express";
import getAll from "../controllers/menuConrollers.js";

export const menuRouter = express.Router();

menuRouter.get("/", getAll);
