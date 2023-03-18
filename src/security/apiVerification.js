
const { httpStatusCode, message } = require("../utils/constants");


function apiAuthVerification(request, response, next) {
	const token = request.get('Authorization');

	if (token === undefined) {
		return response.status(httpStatusCode.UNAUTHORIZED).send(message.INCORRECT_CREDENTIALS);
	}

	//only call this once you have verified the token being sent is trusetd AND we have logged the access
	next();
}

module.exports = {
	apiAuthVerification,
}