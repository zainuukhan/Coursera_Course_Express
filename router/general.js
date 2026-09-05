// Task 3 & Task 11: Get book details based on ISBN
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