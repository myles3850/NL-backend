const jwt = require('jsonwebtoken');
const { pool } = require("../database/connection");
const { httpStatusCode, message } = require("../utils/constants");


async function apiAuthVerification(request, response, next) {
	const token = request.get('Authorization');

	if (token === undefined) {
		return response.status(httpStatusCode.UNAUTHORIZED).send(message.INCORRECT_CREDENTIALS);
	}

	const getLastQueryForUser = `
	SELECT last_query FROM api_users 
	WHERE token = $1`;

	try {
	
		const secret = process.env.JWT_SECRET;
		await jwt.verify(token, secret)
		const jwtPayload = jwt.decode(token)
	
		pool.query(getLastQueryForUser, [jwtPayload.token]);

		
	} catch (e) {
		
	}

	//only call this once you have verified the token being sent is trusetd AND we have logged the access
	next();
}

module.exports = {
	apiAuthVerification,
}