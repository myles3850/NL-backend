const { httpStatusCode, message } = require("../utils/constants");

function apiAuthVerification(request, response, next) {
	const token = request.get('Authorization');

	if (token.isUndefined()) {
		return response.status(httpStatusCode.UNAUTHORIZED).send(message.INCORRECT_CREDENTIALS);
	}
	next();
}