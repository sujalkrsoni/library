import Book from "../models/Book.js";

// Create a new book
export const createBook = async (req, res, next) => {
  try {
    const { title, author, publishedDate, genre } = req.body;

    const newBook = new Book({ title, author, publishedDate, genre });
    await newBook.save();

    res.status(201).json({
      success: true,
      message: "Created Successfully!",
      data: newBook,
    });
  } catch (error) {
    next(error);
  }
};

// Get all books
export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    next(error);
  }
};

// Get book by ID
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

// Update book
export const updateBook = async (req, res, next) => {
  try {
    const { title, author, publishedDate, genre } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publishedDate, genre },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Updated Successfully!",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// Delete book
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Deleted Successfully!",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};
