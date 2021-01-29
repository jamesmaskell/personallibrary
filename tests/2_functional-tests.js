/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
const ObjectId = require("mongodb").ObjectId;

chai.use(chaiHttp);

suite("Functional Tests", function () {
	/*
	 * ----[EXAMPLE TEST]----
	 * Each test should completely test the response of the API end-point including response status code!
	 */
	/*test("#example Test GET /api/books", function (done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, "response should be an array");
        assert.property(res.body[0], "commentcount", "Books in array should contain commentcount");
        assert.property(res.body[0], "title", "Books in array should contain title");
        assert.property(res.body[0], "_id", "Books in array should contain _id");
        done();
      });
  });*/
	/*
	 * ----[END of EXAMPLE TEST]----
	 */
	console.clear();
	suite("Routing tests", function () {
		suite("POST /api/books with title => create book object/expect book object", function () {
			test("Test POST /api/books with title", function (done) {
				chai
					.request(server)
					.post("/api/books")
					.type("form")
					.send({ title: "The Warehouse" })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.title, "The Warehouse");
						assert.isTrue(/[a-f0-9]{24}/g.test(res.body._id));
						done();
					});
			});

			test("Test POST /api/books with no title given", function (done) {
				chai
					.request(server)
					.post("/api/books")
					.type("form")
					.send({})
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body, "missing required field title");
						done();
					});
			});
		});

		suite("GET /api/books => array of books", function () {
			test("Test GET /api/books", function (done) {
				chai
					.request(server)
					.get("/api/books")
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.length, 2);
						res.body.forEach((element) => {
							assert.isTrue(element.hasOwnProperty("title"));
							assert.isTrue(element.hasOwnProperty("_id"));
							assert.isTrue(element.hasOwnProperty("comments"));
							assert.isTrue(element.hasOwnProperty("__v"));
							assert.isTrue(typeof element.comments == "object");
						});
						done();
					});
			});
		});

		suite("GET /api/books/[id] => book object with [id]", function () {
			test("Test GET /api/books/[id] with id not in db", function (done) {
				chai
					.request(server)
					.get("/api/books/60126d13bf46769f5dadc2d4")
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body, "no book exists");
						done();
					});
			});

			test("Test GET /api/books/[id] with valid id in db", function (done) {
				chai
					.request(server)
					.get("/api/books/60126d02de5eaeadef120998")
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.title, "the glass hotel");
						assert.equal(res.body.commentcount, 0);
						assert.equal(res.body._id.toString(), "60126d02de5eaeadef120998");
						assert.deepEqual(res.body.comments, []);
						assert.equal(res.body.__v, 0);
						done();
					});
			});
		});

		suite("POST /api/books/[id] => add comment/expect book object with id", function () {
			test("Test POST /api/books/[id] with comment", function (done) {
				chai
					.request(server)
					.post("/api/books/60126d02de5eaeadef120998")
					.type("form")
					.send({ id: "60126d02de5eaeadef120998", comment: "very good" })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.title, "the glass hotel");
						assert.equal(res.body.commentcount, 1);
						assert.equal(res.body._id.toString(), "60126d02de5eaeadef120998");
						assert.deepEqual(res.body.comments[0], "very good");
						assert.equal(res.body.__v, 1);
						done();
					});
			});

			test("Test POST /api/books/[id] without comment field", function (done) {
				chai
					.request(server)
					.post("/api/books/60126d02de5eaeadef120998")
					.type("form")
					.send({ id: "60126d02de5eaeadef120998", comment: undefined })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body, "missing required field comment");
						done();
					});
			});

			test("Test POST /api/books/[id] with comment, id not in db", function (done) {
				chai
					.request(server)
					.post("/api/books/70126d02de5eaeadef120998")
					.type("form")
					.send({ id: "70126d02de5eaeadef120998", comment: "very good" })
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body, "no book exists");
						done();
					});
			});
		});

		suite("DELETE /api/books/[id] => delete book object id", function () {
			test("Test DELETE /api/books/[id] with valid id in db", function (done) {
				chai
					.request(server)
					.delete("/api/books/60126d02de5eaeadef120998")
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body, "delete successful");
						done();
					});
			});

			test("Test DELETE /api/books/[id] with  id not in db", function (done) {
				chai
					.request(server)
					.delete("/api/books/70126d02de5eaeadef120998")
					.end(function (err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body, "no book exists");
						done();
					});
			});
		});
	});
});
