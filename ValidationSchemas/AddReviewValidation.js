const { body, validationResult } = require("express-validator");

exports.AddReviewValidation = [
  body("comment")
    .isLength({ min: 6 })
    .withMessage("Comment must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
