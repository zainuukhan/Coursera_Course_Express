const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 10: Get all books using Promises
public_users.get('/', function (req, res) {
  const getBooks = new Promise((resolve, reject) => {
    resolve(books);
  });
  getBooks.then((bookList) => {
    return res.status(200).json(bookList);
  }).catch((err) => {
    return res.status(500).json({ message: "Error retrieving books" });
  });
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const getBook = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  });

  getBook.then((book) => {
    return res.status(200).json(book);
  }).catch((err) => {
    return res.status(404).json({ message: err });
  });
});

// Task 12: Get book details based on Author using Promises
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const getBooksByAuthor = new Promise((resolve, reject) => {
    let results = [];
    for (let key in books) {
      if (books[key].author.toLowerCase() === author.toLowerCase()) {
        results.push(books[key]);
      }
    }
    resolve(results);
  });

  getBooksByAuthor.then((booksFound) => {
    return res.status(200).json(booksFound);
  });
});

// Task 13: Get book details based on Title using Promises
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const getBooksByTitle = new Promise((resolve, reject) => {
    let results = [];
    for (let key in books) {
      if (books[key].title.toLowerCase() === title.toLowerCase()) {
        results.push(books[key]);
      }
    }
    resolve(results);
  });

  getBooksByTitle.then((booksFound) => {
    return res.status(200).json(booksFound);
  });
});

module.exports.general = public_users;