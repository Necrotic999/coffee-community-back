import express from "express";
import cors from "cors";
import reviewsRouter from "./routes/reviewsRouter.js";
import mongoose from "mongoose";
import "dotenv/config";
import vacanciesRouter from "./routes/vacanciesRouter.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: false,
  })
);
app.use(express.json());

app.use("/api/reviews", reviewsRouter);

app.use("/api/vacancies", vacanciesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running. Use our API on port: 8000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
