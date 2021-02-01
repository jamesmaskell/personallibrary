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

  this.addComment = async function (payload) {
    let idx = storage.findIndex((book) => book._id.toString() == payload.id);

    if (idx == -1) return undefined;

    storage[idx].comments.push(payload.comment);
    storage[idx].commentcount++;
    storage[idx].__v++;
    return storage[idx];
  };

  this.delete = async function (bookId) {
    if (bookId == undefined) {
      storage = [];
      return true;
    } else {
      let idx = storage.findIndex((book) => book._id.toString() == bookId);
      if (idx == -1) return false;
      storage.splice(idx, 1);
      return true;
    }
  };

  this.createBook = async function (payload) {
    try {
      payload._id = ObjectId(mongoObjectId());
      storage.push(payload);
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
