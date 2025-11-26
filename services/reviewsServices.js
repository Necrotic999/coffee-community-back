import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const reviewsPath = path.resolve("db", "reviews.json");

const updateReviews = (reviews) =>
  fs.writeFile(reviewsPath, JSON.stringify(reviews, null, 2));

export const getAllReviws = async () => {
  const data = await fs.readFile(reviewsPath);
  return JSON.parse(data);
};

export const addReview = async (data) => {
  const reviews = await getAllReviws();
  const newReview = {
    id: nanoid(),
    ...data,
  };

  reviews.push(newReview);
  await updateReviews(reviews);

  return newReview;
};
