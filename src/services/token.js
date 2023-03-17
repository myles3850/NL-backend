const jwt = require('jsonwebtoken');
const { pool } = require('../database/connection');
const { message, httpStatusCode } = require('../utils/constants');


const authenticateAPIRequest = async (request, response) => {

	const captureQuery = `
	SELECT TOP 1 salt, hashed_password FROM credentials
	WHERE user_type = 2 AND user_id IN (
		SELECT user_id FROM users WHERE is_api_user = true 
		AND email = $1)
	`

	const responseObj = {
		sucsess: false,
	}

	const {ID, secret} = request.params;
	//todo - capture the credentials and return a test token built from the credentials sent
	const secretCredentials = await pool.query(captureQuery, [ID,]);
	
	if (!secretCredentials.rowCount) {
		responseObj.message = message.INCORRECT_CREDENTIALS;
		return response.status(httpStatusCode.UNAUTHORIZED).send(responseObj);
	}
	
};

module.exports = {
	authenticateAPIRequest
};