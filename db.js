const mysql = require("mysql");

const dbConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT
};

const sqlConnection = function sqlConnection(sql, values, next) {
	// Check to see if values were passed
	// and set to null if they weren't
	if (arguments.length === 2) {
		next = values;
		values = null;
	}
	// establish the connection
	const connection = mysql.createConnection(dbConfig);
	connection.connect(function(err) {
		if (err !== null) {
			console.log("[MYSQL] Error connecting to mysql:" + err + "\n");
		}
	});

	// Perform the query
	connection.query(sql, values, function(err) {
		connection.end(); // close the connection
		if (err) {
			throw err;
		}
		// Execute the callback
		next.apply(this, arguments);
	});
};

module.exports = sqlConnection;
