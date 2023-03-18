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

	const updateLastQueryTime = `
	UPDATE api_users
	SET last_query = $1 
	WHERE token = $2`;

	try {
	
		const secret = process.env.JWT_SECRET;
		await jwt.verify(token, secret)
		const jwtPayload = jwt.decode(token)
	
		const userTime = await pool.query(getLastQueryForUser, [jwtPayload.token]);

		if (!userTime.rowCount) {
			//return token not recognised
		}
		await pool.query(updateLastQueryTime, [Date.now(), jwtPayload.token]);



	} catch (e) {
		//return system error if anything falls over to here
	}

	//only call this once you have verified the token being sent is trusetd AND we have logged the access
	next();
}

module.exports = {
	apiAuthVerification,
}