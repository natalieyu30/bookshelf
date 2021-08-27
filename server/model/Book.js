const mongoose = require("mongoose");

let bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: String,
  rating: Number,
  desc: String,
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
