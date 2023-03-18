const { pool } = require('../database/connection');
const createScript = require('../database/scripts/createTables');
const { message, httpStatusCode } = require('../utils/constants');

const createDatabase = (request, response) => {
	const { password } = request.body;
	if (!password) {
		return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error: message.INVALID_REQUEST });
	}
	if (password === process.env.DB_MIGRATION_KEY) {
		pool.query(createScript, (error, results) => {
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
