const { body, validationResult } = require("express-validator");

exports.addBookValidation = [
  body("id").isString().withMessage("Please provide book id"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
