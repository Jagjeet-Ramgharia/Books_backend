const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  books: [{ type: mongoose.Schema.Types.String, ref: "Book" }],
});

module.exports = mongoose.model("User", userSchema);
