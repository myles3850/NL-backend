const jwt = require('jsonwebtoken');
const { pool } = require('../database/connection');
const { message, httpStatusCode } = require('../utils/constants');


const authenticateAPIRequest = (request, response) => {
	const {ID, secret} = request.params;
	//todo - capture the credentials and return a test token built from the credentials sent
};

module.exports = {
	authenticateAPIRequest
};