const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const methodOverride = require("method-override");
const route = require("./server/routes/router");

const app = express();
dotenv.config({ path: "config.env" });

// set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, 'views/ejs'))

// load assets
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(methodOverride("_method"));

// connect mongodb data
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => console.log(`MongoDB connected`))
  .catch((err) => console.log(err));

// load routers
app.use("/api/books", route);

// render ejs files
app.get("/", (req, res) => {
  // make a get request to /api/books
  axios
    .get("http://localhost:3000/api/books")
    .then((result) => {
      res.render("index", { books: result.data });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/add-book", (req, res) => res.render("addBook"));
app.get("/book-details/:id", (req, res) => {
  axios
    .get(`http://localhost:3000/api/books/${req.params.id}`)
    .then((result) => {
      res.render("singleBook.ejs", { book: result.data });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/update-book/:id", (req, res) => {
  axios
    .get(`http://localhost:3000/api/books/${req.params.id}`)
    .then((result) => {
      // console.log(result.data);
      res.render("updateBook.ejs", { book: result.data });
    })
    .catch((err) => {
      res.send(err);
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
