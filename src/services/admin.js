const { pool } = require('../database/connection');
const { message, httpStatusCode } = require('../utils/constants');

const createDatabase = (request, response) => {
	const { password } = request.body;
	if (!password) {
		return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error: message.INVALID_REQUEST });
	}
	if (password === process.env.JWT_PASSWORD) {
		const query = `
		CREATE SEQUENCE IF NOT EXISTS users_id_seq;

		CREATE TABLE IF NOT EXISTS users (
			name text COLLATE pg_catalog."default" NOT NULL,
			email text COLLATE pg_catalog."default" NOT NULL,
			id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
			CONSTRAINT users_pkey PRIMARY KEY (email),
			CONSTRAINT userid UNIQUE (id),
			CONSTRAINT unique_email UNIQUE (email)
		);

		CREATE TABLE IF NOT EXISTS credentials (
			user_id INT UNIQUE NOT NULL,
			salt VARCHAR(64) NOT NULL,
			hashed_password VARCHAR(1000) NOT NULL,
			FOREIGN KEY (user_id)
			REFERENCES users (id)
		);
		CREATE TABLE IF NOT EXISTS medication (
			id serial NOT NULL,
			medication text NOT NULL,
			"inUse" boolean NOT NULL DEFAULT true,
			dose character(11),
			freq text,
			notes text,
			"userId" integer NOT NULL,
			PRIMARY KEY (id),
			CONSTRAINT userlink FOREIGN KEY ("userId")
				REFERENCES users (id) MATCH SIMPLE
				ON UPDATE NO ACTION
				ON DELETE NO ACTION
		);`;
		pool.query(query, (error, results) => {
			if (error) {
				return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
			}
			return response.status(httpStatusCode.CREATED).json({ done: true });
		});
	} else {
		return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error: message.INVALID_REQUEST });
	}
};

module.exports = { createDatabase };
