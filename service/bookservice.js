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

	this.updateBook = async function () {};

	this.getBook = async function () {};

	this.deleteBook = async function () {};
}

module.exports = BookService;
