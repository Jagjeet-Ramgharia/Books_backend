const router = require("express").Router();
const {
  createUserSchema,
} = require("../ValidationSchemas/RegistrationValidationSchema");
const userAuthentication = require("../MiddleWares/AuthMiddleWare.js");
const { loginUserValidation } = require("../ValidationSchemas/LoginValidation");
const {
  addBookValidation,
} = require("../ValidationSchemas/AddBooksValidation");
const {
  AddReviewValidation,
} = require("../ValidationSchemas/AddReviewValidation");
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


// get reviews of a books
router.get(
  "/get-reviews/:bookId",
  // userAuthentication,
  BooksController.getReviews
);


module.exports = router;
