const ObjectId = require("mongodb").ObjectId;

function BookRepository() {
	const mongoObjectId = function () {
		//convert unix time in seconds to hex string
		var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
		//generate random hex string and concat to timestampe hex
		return (
			timestamp +
			"xxxxxxxxxxxxxxxx"
				.replace(/[x]/g, function () {
					// get random base16 (hex) character
					return ((Math.random() * 16) | 0).toString(16);
				})
				.toLowerCase()
		);
	};
	let storage = [];

	this.createBook = async function (payload) {
		try {
			payload._id = ObjectId(mongoObjectId());

			decoratedPayload = { ...payload };
			decoratedPayload.comments = [];
			decoratedPayload.commentcount = 0;
			decoratedPayload.__v = 0;
			storage.push(decoratedPayload);

			return payload._id;
		} catch (e) {
			console.log("some error", e);
			return null;
		}
	};
}

module.exports = BookRepository;
