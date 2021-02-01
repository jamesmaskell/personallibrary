const ObjectId = require("mongodb").ObjectId;

function BookRepository(client) {
	this.addComment = async function (payload) {
		try {
			let result = await client
				.db("personallibrary")
				.collection("books")
				.findOneAndUpdate({ _id: ObjectId(payload.id) }, { $push: { comments: payload.comment }, $inc: { commentcount: 1, __v: 1 } }, { returnOriginal: false });
			if (result.value) return result.value;
		} catch (e) {
			console.error(e);
		}
	};

	this.delete = async function (bookId) {
		try {
			let result;
			if (bookId == undefined) {
				result = await client.db("personallibrary").collection("books").deleteMany({});
				return true;
			} else {
				result = await client
					.db("personallibrary")
					.collection("books")
					.deleteOne({ _id: ObjectId(bookId) });
				if (result.deletedCount <= 0) return false;
				return true;
			}
		} catch (e) {
			console.error(e);
		}
	};

	this.createBook = async function (payload) {
		try {
			let result = await client.db("personallibrary").collection("books").insertOne(payload);
			return result.insertedId;
		} catch (e) {
			console.error(e);
			1;
		}
	};

	this.getBooks = async function (bookId) {
		try {
			if (bookId == undefined) {
				return await client.db("personallibrary").collection("books").find({}).toArray();
			}
			return await client
				.db("personallibrary")
				.collection("books")
				.findOne({ _id: ObjectId(bookId) });
		} catch (e) {
			console.error(e);
		}
	};
}

module.exports = BookRepository;
