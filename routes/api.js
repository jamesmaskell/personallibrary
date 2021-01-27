/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

module.exports = function (app, bookService) {
	app
		.route("/api/books")
		.get(async function (req, res) {
			//response will be array of book objects
			//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
		})

		.post(async function (req, res) {
			let title = req.body.title;
			//response will contain new book object including atleast _id and title
			return res.json(await bookService.createBook(req.body));
		})

		.delete(async function (req, res) {
			//if successful response will be 'complete delete successful'
		});

	app
		.route("/api/books/:id")
		.get(async function (req, res) {
			let bookid = req.params.id;
			//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
		})

		.post(async function (req, res) {
			let bookid = req.params.id;
			let comment = req.body.comment;
			//json res format same as .get
		})

		.delete(async function (req, res) {
			let bookid = req.params.id;
			//if successful response will be 'delete successful'
		});
};
