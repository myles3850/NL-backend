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



const pool = new Pool({'postgres://tdrodwjmsnrabl:fa32a0082137861fdbc8e61e214c8a76b31b2a799a2ffb208e18509c80472d55@ec2-34-246-227-219.eu-west-1.compute.amazonaws.com:5432/decjp0i9crljb9'});

module.exports = {
  pool
};
