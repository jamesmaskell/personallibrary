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
  let storage = [{ comments: [], _id: "60126d02de5eaeadef120998", title: "the glass hotel", commentcount: 0, __v: 0 }];

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

  this.getBooks = async function (bookId) {
    if (bookId == undefined) return storage;
    return storage.filter((book) => book._id.toString() == bookId)[0];
  };
}

module.exports = BookRepository;
