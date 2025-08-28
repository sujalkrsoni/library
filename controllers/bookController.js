import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  const { title, author, publishedDate, genre } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      publishedDate,
      genre,
    });
    if (!title || !author) {
      return res.status(400).json({ message: "Title and Author are required" });
    }

    await newBook.save();
    res.status(201).json({ message: "Created Successfully !", data: newBook });
  } catch (error) {
    next(error); 
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    next(error); 
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    console.error("❌ Error fetching book:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, author, publishedDate, genre } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        publishedDate,
        genre,
      },
      { new: true }
    );

    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json({ message: "Updated Successfully !", data: book });
    }
  } catch (error) {
    next(error); 
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json({
        message: "Deleted Successfully!",
        data: book,
      });
    }
  } catch (error) {
    next(error); 
  }
};
