function BookService(repository) {
  this.createBook = async function (payload) {
    if (payload.title == undefined) return "missing required field title";

    let decoratedPayload = { ...payload };
    decoratedPayload.comments = [];
    decoratedPayload.commentcount = 0;
    decoratedPayload.__v = 0;

    let _id = await repository.createBook(decoratedPayload);
    if (_id.toString()) {
      payload._id = _id.toString();
      return payload;
    }
    return "cannot create book";
  };

  this.addComment = async function (bookId, payload) {
    if (!payload.hasOwnProperty("comment") || payload.comment == undefined || payload.comment == null || payload.comment == "") {
      return "missing required field comment";
    }

    if (payload.id == undefined) payload.id = bookId;

    let db_response = await repository.addComment(payload);

    if (db_response == undefined) return "no book exists";
    return db_response;
  };

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

  this.delete = async function (bookId) {
    if (bookId == undefined) {
      let success = await repository.delete();
      //could be "'complete delete successful"
      return success ? "complete delete successful" : "";
    } else {
      let success = await repository.delete(bookId);
      return success ? "delete successful" : "no book exists";
    }
  };
}

module.exports = BookService;
