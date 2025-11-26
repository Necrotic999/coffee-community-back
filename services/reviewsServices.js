import Review from "../models/Review.js";

export const getAllReviws = () => Review.find();

export const addReview = (data) => Review.create(data);
