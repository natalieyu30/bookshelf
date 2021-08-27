const express = require("express");
const route = express.Router();
const Book = require("../model/Book");
const {
  CreateBook,
  GetAllBooks,
  GetOneBook,
  UpdateBook,
  DeleteBook,
} = require("../controller/controller");

const confirmDelete = (req, res, next) => {
  const result = confirm("Do you want to delete this book contents?");
  if (result) {
    next();
  }
};
// API
route.post("/", CreateBook);
route.get("/", GetAllBooks);
route.get("/:id", GetOneBook);
route.put("/:id", UpdateBook);
route.delete("/:id", DeleteBook);

module.exports = route;
