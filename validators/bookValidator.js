import Joi from "joi";

// Create Book (POST)
export const createBookSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  author: Joi.string().min(2).max(50).required(),
  publishedDate: Joi.date().iso().required(),
  genre: Joi.string().min(3).max(30).required(),
});

// Update Book (PUT / PATCH)
export const updateBookSchema = Joi.object({
  title: Joi.string().min(2).max(100),
  author: Joi.string().min(2).max(50),
  publishedDate: Joi.date().iso(),
  genre: Joi.string().min(3).max(30),
}).min(1); // at least one field must be provided
