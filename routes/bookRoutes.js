import { getBooks, getBookById, updateBook, deleteBook, createBook } from "../controllers/bookController.js";
import { auth, authorize } from "../middlewares/auth.js";

import express from "express"
const router = express.Router();

router.post("/", auth, authorize("admin"), createBook);
router.get("/", getBooks);
router.get("/:id",auth, authorize("admin"), getBookById);
router.put("/:id",auth, authorize("admin"), updateBook);
router.delete("/:id",auth, authorize("admin"), deleteBook);

export default router;
