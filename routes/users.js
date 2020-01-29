const express = require("express");
const router = express.Router();
const mysql_query = require("../db");

const { check, validationResult, sanitizeBody } = require("express-validator");

/* GET all users */
router.get("/", (req, res) => {
	mysql_query(
		"SELECT username, email_address FROM users WHERE ? ",
		{ deleted: 0 },
		(err, rows) => {
			res.json(rows);
		}
	);
});

/* GET a user */
router.get("/:id", (req, res) => {
	// Gather the id from the request parameters
	const userId = req.params.id;

	// Check to see if the params are valid - otherwise return an error.
	if (isNaN(userId)) {
		res.status(400);
	}

	// Run the query
	mysql_query(
		"SELECT username, email_address FROM users WHERE ?",
		{ id: userId },
		(err, rows) => {
			if (rows.length === 0) {
				res.status(400);
			}
			if (err) {
				res.status(500);
			}
			const row = rows[0];
			res.json(row);
		}
	);
});

/* POST a new user */
router.post(
	"/",
	[
		check("username")
			.isLength({ min: 4 })
			.isAlphanumeric()
			.trim()
			.escape(),
		check("email_address")
			.isEmail()
			.normalizeEmail({ lowercase: true })
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		// Gather the new user details
		// TODO -> Break out into a user schema/model
		const newUser = {
			username: req.body.username.toLowerCase(),
			email_address: req.body.email_address
		};

		mysql_query(
			"INSERT INTO users (username, email_address) VALUES (?, ?)",
			[newUser.username, newUser.email_address],
			(err, result) => {
				if (err) {
					res.status(500);
				}
				res.status(201).json(result);
			}
		);
	}
);

module.exports = router;
