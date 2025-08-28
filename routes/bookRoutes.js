import { getBooks, getBookById, updateBook, deleteBook, createBook } from "../controllers/bookController.js";

import express from "express"
const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
