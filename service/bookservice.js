function BookService(repository) {
  this.createBook = async function (payload) {
    if (payload.title == undefined) return "missing required field title";

    let _id = await repository.createBook(payload);
    if (_id) {
      payload._id = _id;
      return payload;
    }
    return "cannot create book";
  };

  this.addComment = function (payload) {};

  this.updateBook = async function () {};

  this.getBooks = async function (bookId) {
    let books;

    if (bookId == undefined) {
      books = await repository.getBooks();
    } else {
      books = await repository.getBooks(bookId);
    }

    if (books == undefined || books == null || books.length <= 0) return "no book exists";

    return books;
  };

  this.deleteBook = async function () {};
}

module.exports = BookService;
