const Pool = require("pg").Pool;
const parse = require("pg-connection-string").parse;
require("dotenv").config();

var connString = process.env.DATABASE_URL;

var config = undefined;

if (process.env.DEV_MODE) {
	config = {
		user: process.env.SQLUSER,
		host: process.env.SQLADDR,
		database: process.env.SQLDB,
		password: process.env.SQLPASS,
		port: process.env.SQLPORT,
	}
} else {
	config = {
		connectionString: process.env.DATABASE_URL,
		ssl: {
		  rejectUnauthorized: false,
		},
	  }

}


if (typeof connString === 'string') {
	connString = parse(connString);
} else {
	connString = {
		user: process.env.SQLUSER,
		host: process.env.SQLADDR,
		database: process.env.SQLDB,
		password: process.env.SQLPASS,
		port: process.env.SQLPORT,
	}
}

console.log(config);
const pool = new Pool(config);

module.exports = {
	pool,
};
