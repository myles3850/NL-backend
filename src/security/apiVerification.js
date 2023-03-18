const jwt = require('jsonwebtoken');
const { pool } = require("../database/connection");
const { httpStatusCode, message } = require("../utils/constants");
const { getCurrentTimeFromStamp } = require('../utils/functions');


async function apiAuthVerification(request, response, next) {
	const token = request.get('Authorization');

	let isAuthroised = false;

	if (token === undefined) {
		return response.status(httpStatusCode.UNAUTHORIZED).send(message.INCORRECT_CREDENTIALS);
	}

	const getLastQueryForUser = `
	SELECT last_query FROM api_tokens 
	WHERE token = $1`;

	const updateLastQueryTime = `
	UPDATE api_tokens
	SET last_query = $1 
	WHERE token = $2`;

	try {
	
		const secret = process.env.JWT_SECRET;
		await jwt.verify(token, secret)
		const jwtPayload = jwt.decode(token)
	
		const userTime = await pool.query(getLastQueryForUser, [jwtPayload.token]);

		if (!userTime.rowCount) {
			//return token not recognised
			return response.status(httpStatusCode.UNAUTHORIZED).send(message.INCORRECT_CREDENTIALS);
		}
		await pool.query(updateLastQueryTime, [getCurrentTimeFromStamp(), jwtPayload.token]);
		isAuthroised = true


	} catch (e) {
		//return system error if anything falls over to here
		console.log(e)
		return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(message.INVALID_REQUEST);
	}

	//only call this once you have verified the token being sent is trusetd AND we have logged the access
	if (isAuthroised) {
		next();
	}
	
}

module.exports = {
	apiAuthVerification,
}