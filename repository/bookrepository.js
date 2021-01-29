const ObjectId = require("mongodb").ObjectId;

function BookRepository() {
	this.addComment = async function (payload) {};

	this.delete = async function (bookId) {};

	this.createBook = async function (payload) {};

	this.getBooks = async function (bookId) {};
}

module.exports = BookRepository;
