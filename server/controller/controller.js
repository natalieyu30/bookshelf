const Book = require("../model/Book");

// create and save new book
const CreateBook = (req, res) => {
  if (!req.body) {
    res.status(400).json("Content can not be empty.");
    return;
  }
  // new book
  const book = new Book(req.body);
  book
    .save()
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const GetAllBooks = (req, res) => {
  if (req.params.id) {
    Book.find({ _id: req.params.id }).then((data) => res.send(data));
  }
  Book.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const GetOneBook = (req, res) => {
  const id = req.params.id;
  Book.find({ _id: id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const UpdateBook = (req, res) => {
  if (!req.body) {
    res.status(400).json("Updating Content can not be empty.");
    return;
  }
  const id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json(`Cannot update book with ID-${id}. Data not found.`);
      } else {
        res.redirect(`/book-details/${id}`);
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const DeleteBook = (req, res) => {
  const id = req.params.id;

  Book.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json(`Cannot delete book with ID-${id}. Data not found.`);
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

module.exports = {
  CreateBook,
  GetAllBooks,
  GetOneBook,
  UpdateBook,
  DeleteBook,
};
