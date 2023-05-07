const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const bookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
    },
    title: String,
    author: { type: mongoose.Schema.Types.String, ref: "Author" },
    genre: { type: mongoose.Schema.Types.String, ref: "Genre" },
    description: String,
    isbn: String,
    image: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
