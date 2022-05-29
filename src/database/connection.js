const Pool = require("pg").Pool;
require('dotenv').config();


const pool = new Pool({
	user: process.env.SQLUSER,
	host: process.env.SQLADDR,
	database: process.env.SQLDB,
	password: process.env.SQLPASS,
	port: process.env.SQLPORT,
});

module.exports = {
  pool
};
