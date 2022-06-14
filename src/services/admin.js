
const {pool} = require('../database/connection');
const {message, httpStatusCode} = require("../utils/constants");


const createDatabase = (request, response) => {
	const {password} = request.body;

	if (!password) {
		return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({error:message.INVALID_REQUEST})
	}
	return response.json({done:true});
}

module.exports = {createDatabase};