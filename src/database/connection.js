const Pool = require("pg").Pool;
require('dotenv').config();

var conn = process.env.DATABASE_URL;

if (!process.env.DATABASE_URL) {
	conn = {	user: process.env.SQLUSER,
		host: process.env.SQLADDR,
		database: process.env.SQLDB,
		password: process.env.SQLPASS,
		port: process.env.SQLPORT}
	}



const pool = new Pool({conn,});

module.exports = {
  pool
};
