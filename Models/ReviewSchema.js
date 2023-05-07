const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const reviewSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    book: { type: mongoose.Schema.Types.String, ref: "Book" },
    comment: String,
  },
  {
    timeseries: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
