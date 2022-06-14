const Pool = require("pg").Pool;
const parse = require("pg-connection-string").parse;
require("dotenv").config();

var conn =
	{
		user: process.env.SQLUSER,
		host: process.env.SQLADDR,
		database: process.env.SQLDB,
		password: process.env.SQLPASS,
		port: process.env.SQLPORT,
	} || parse(process.env.DATABASE_URL);

const pool = new Pool(conn);

module.exports = {
	pool,
};
