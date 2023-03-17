const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../database/connection');
const { message, httpStatusCode } = require('../utils/constants');


const authenticateAPIRequest = async (request, response) => {
	const {ID, secret} = request.params;
	
	const responseObj = {
		sucsess: false,
	}

	const captureQuery = `
	SELECT salt, hashed_password FROM credentials
	WHERE user_type = 2 AND user_id IN (
		SELECT user_id FROM users WHERE is_api_user = true 
		AND email = $1)
	fetch first 1 rows only
	`
	//todo - capture the credentials and return a test token built from the credentials sent
	const secretCredentials = await pool.query(captureQuery, [ID,]);
	
	if (!secretCredentials.rowCount) {
		responseObj.message = message.INCORRECT_CREDENTIALS;
		return response.status(httpStatusCode.UNAUTHORIZED).send(responseObj);
	}

	const {salt, hashed_password} = secretCredentials.rows[0];
	const hashedPassword = hashed_password;
	
	const givenPassword = bcrypt.hash(secret, salt);

	if (givenPassword != hashedPassword){
		responseObj.message = message.INCORRECT_CREDENTIALS;
		return response.status(httpStatusCode.UNAUTHORIZED).send(responseObj);
	} else {
		responseObj.sucsess = true;
		responseObj.message = message.AUTHORISED;
		return response.status(httpStatusCode.AUTHORISED).send(responseObj);
	}

};

module.exports = {
	authenticateAPIRequest
};