const router = require("express").Router();
const {
  createUserSchema,
} = require("../ValidationSchemas/RegistrationValidationSchema");
const User = require("../Models/UserModel");
const Book = require("../Models/BooksModel");
const userAuthentication = require("../MiddleWares/AuthMiddleWare.js");
const ReviewSchema = require("../Models/ReviewSchema");
const { loginUserValidation } = require("../ValidationSchemas/LoginValidation");
const {
  addBookValidation,
} = require("../ValidationSchemas/AddBooksValidation");
const {
  AddReviewValidation,
} = require("../ValidationSchemas/AddReviewValidation");
const AuthorModel = require("../Models/AuthorModel");
const GenreSchema = require("../Models/GenreSchema");
const AuthController = require("../controllers/AuthController");
const SeedingController = require("../controllers/SeedingController");
const GenreController = require("../controllers/GenreController");
const BooksController = require("../controllers/BooksController");
const AuthorController = require("../controllers/AuthorsController");

//------------------------------------------------------------------------------------------------

// Register a User
router.post("/register", createUserSchema, AuthController.register);

// Login User api
router.post("/login", loginUserValidation, AuthController.login);

// get user api
router.get("/info", userAuthentication, AuthController.info);

// Books Seeding
router.get("/books-seed", SeedingController.CreatedBooks);

// Author's Seeding
router.get("/authors-seed", SeedingController.CreateAuthors);

// get all authors
router.get("/authors", userAuthentication, AuthorController.GetAuthors);

// genre Seeding
router.get("/genre-seed", SeedingController.CreateGenres);

// get all genres
router.get("/genres", userAuthentication, GenreController.getAllGenres);

// Books Listing Api
router.get("/books", userAuthentication, BooksController.getAllBooks);

// Add books to user
router.post(
  "/add-books",
  [userAuthentication, addBookValidation],
  BooksController.addBooks
);

// get User Added Books
router.get("/favourites", userAuthentication, BooksController.getFavourite);

// Delete books from users
router.delete(
  "/delete-books/:bookId",
  userAuthentication,
  BooksController.deleteBooks
);

// Add reviews to books
router.post(
  "/books/:id/reviews",
  [userAuthentication, AddReviewValidation],
  BooksController.addReviews
);

// Search for books
// router.get("/search", userAuthentication, async (req, res) => {
//   const { q } = req.query;
//   try {
//     const books = await Book.find({
//       $or: [
//         { title: { $regex: q, $options: "i" } },
//         { author: { $regex: q, $options: "i" } },
//         { genre: { $regex: q, $options: "i" } },
//       ],
//     });
//     res.status(200).json({ books: books });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
