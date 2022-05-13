const { pool } = require("../connection");

//this endpoint gathers all medication for a given user, takes the parameters ID to assign to the user queried
const getUsersMedications = (request, response) => {
	//validation to see if ID field has been entered as parameter in request
	const userId = parseInt(request.query.ID);
	if (!request.query.ID) {
		return response
			.status(400)
			.json({ error: "required field 'ID' missing, please correct and send request again" });
	}
	//validation to check the paramter is a number only
	if (isNaN(userId)) {
		return response
			.status(400)
			.json({ error: "required field 'ID' needs to be a number, please correct and send request again" });
	}

	pool.query("SELECT * FROM medication WHERE user = $1", [userId], (error, results) => {
		if (error) {
			return response.status(400).send(error.detail);
		}
		response.status(200).json(results.rows);
	});
};

const getUserById = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

module.exports = {
	getUsersMedications,
	getUserById,
};
