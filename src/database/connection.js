const Pool = require("pg").Pool;
require("dotenv").config();

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

const pool = new Pool(config);

module.exports = {
	pool,
};
