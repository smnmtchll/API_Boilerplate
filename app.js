require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");

const bodyParser = require("body-parser");

const app = express();

app.listen(process.env.PORT || 8080, function() {
	var port = process.env.PORT || 8080;
	console.log("App now running on port", port);
});

app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// Catch 404
app.use(function(req, res, next) {
	next(res.sendStatus(404));
});

// Error handler
app.use(function(err, req, res, next) {
	// Set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// Return the error
	res.status(err.status || 500);
	res.sendStatus(500);
});

module.exports = app;
