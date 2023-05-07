const Book = require("../Models/BooksModel");
const ReviewSchema = require("../Models/ReviewSchema");
const User = require("../Models/UserModel");

const getAllBooks = async (req, res) => {
  const perPage = req.query.size || 10; // number of results per page
  const page = req.query.page || 1; // current page number (default to 1)
  const search = req.query.search; // search query string
  const author = req.query.author; // filter on authors
  const genre = req.query.genre; // filter on genres

  try {
    let query = Book.find();

    if (search || author || genre) {
      // if search query is provided, filter by title, genre and author fields
      query = query.or([
        { title: { $regex: search || author || genre, $options: "i" } }, // case-insensitive search
        { author: { $regex: search || author || genre, $options: "i" } },
        { genre: { $regex: search || author || genre, $options: "i" } },
      ]);
    }

    const books = await query
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("reviews")
      .exec();

    const count = await Book.count(); // get total number of matching books
    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(count / perPage),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addBooks = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body;

  try {
    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if book exists
    const book = await Book.findOne({ id });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const userAlreadyHasBook = user.books.filter((b) => b === book.id);

    if (userAlreadyHasBook.length > 0) {
      return res
        .status(409)
        .json({ message: "Book already added to the user" });
    }

    // add book to user's books array
    user.books.push(book.id);
    await user.save();

    res.status(200).json({
      message: "Book added successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFavourite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const bookIds = user.books;
    const userBooks = await Book.find({ id: { $in: bookIds } }).populate(
      "reviews"
    );
    return res.status(200).json({
      message: "Favourites get successfully",
      books: userBooks,
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

const deleteBooks = async (req, res) => {
  const userId = req.user._id;
  const bookId = req.params.bookId;

  try {
    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if book exists
    const book = await Book.findOne({ id: bookId });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // remove book from user's books array
    user.books.pull(bookId);
    await user.save();

    res.json({
      message: "Book removed successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addReviews = async (req, res) => {
  try {
    const book = await Book.findOne({ id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const { comment } = req.body;
    const review = new ReviewSchema({
      user: req.user._id,
      book: book.id,
      comment,
    });
    await review.save();

    book.reviews.push(review);
    await book.save();

    return res
      .status(201)
      .json({ message: "Review added successfully", review });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllBooks,
  addBooks,
  getFavourite,
  deleteBooks,
  addReviews,
};
