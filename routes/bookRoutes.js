import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { auth, authorize } from "../middlewares/auth.js";

import { validate } from "../middlewares/validate.js";
import { createBookSchema, updateBookSchema } from "../validators/bookValidator.js";

const router = express.Router();
// anyone can read 
router.get("/", getBooks);

// only admin can create, update, delete & read specific book 
router.post("/", auth, authorize("admin"), validate(createBookSchema), createBook);
router.get("/:id", auth, authorize("admin"), getBookById);
router.put("/:id", auth, authorize("admin"), validate(updateBookSchema), updateBook);
router.delete("/:id", auth, authorize("admin"), deleteBook);

export default router;
