const Pool = require("pg").Pool;
const parse = require("pg-connection-string").parse;
require("dotenv").config();

var connString = process.env.DATABASE_URL;

if (typeof connString === 'string') {
	connString = parse(connString);
	console.log(connString);
} else {
	connString = {
		user: process.env.SQLUSER,
		host: process.env.SQLADDR,
		database: process.env.SQLDB,
		password: process.env.SQLPASS,
		port: process.env.SQLPORT,
	}
}

const pool = new Pool(connString);

module.exports = {
	pool,
};
