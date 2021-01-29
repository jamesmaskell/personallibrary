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
			return res.json(await bookService.getBooks());
		})

		.post(async function (req, res) {
			//response will contain new book object including atleast _id and title
			return res.json(await bookService.createBook(req.body));
		})

		.delete(async function (req, res) {
			return res.json(await bookService.delete());
		});

	app
		.route("/api/books/:id")
		.get(async function (req, res) {
			let bookId = req.params.id;
			return res.json(await bookService.getBooks(bookId));
		})

		.post(async function (req, res) {
			let bookId = req.params.id;
			return res.json(await bookService.addComment(bookId, req.body));
		})

		.delete(async function (req, res) {
			let bookid = req.params.id;
			return res.json(await bookService.delete(bookid));
		});
};
