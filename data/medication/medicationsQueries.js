const { pool } = require("../connection");

//this endpoint gathers all medication for a given user, takes the parameters ID to assign to the user queried
const getUsersMedications = (request, response) => {
	//validation to see if ID field has been entered as parameter in request
	const userId = parseInt(request.query.ID);
	if (!request.query.ID) {
		return response
			.status(400)
			.json({ error: "required field 'ID' missing, please correct and send request again" });
	};
	//validation to check the paramter is a number only
	if (isNaN(userId)) {
		return response
			.status(400)
			.json({ error: "required field 'ID' needs to be a number, please correct and send request again" });
	};

	pool.query('SELECT id, medication, dose, freq FROM medication WHERE "userId" = $1 AND "inUse" = true', [userId], (error, results) => {
		if (error) {
			return response.status(400).send(error.detail);
		}
		response.status(200).json(results.rows);
	});
};


// endpoint to create new medications the user is taking
const createNewMedication = (request, response) => {
	const { medication, userId, dose, freq, notes } = request.body;

	//query will insert NULL when the variables are set to either NULL or undefined, so no pre-capture required
	pool.query(
		'INSERT INTO medication (medication, dose, freq, notes, "userId") VALUES ($1, $2, $3, $4, $5) RETURNING medication',
		[medication, dose, freq, notes, userId],
		(error, results) => {
			if (error) {
				return response.status(400).send(error.detail);
			}
			response.status(200).json(results.rows);
		}
	);
};

const getMedicationDetails = (request, response) => {
	const medicationId = parseInt(request.params.medicationId);
	if (!request.params.medicationId) {
		return response
			.status(400)
			.json({ error: "required field 'medicationId' missing, please correct and send request again" });
	};
	//validation to check the paramter is a number only
	if (isNaN(medicationId)) {
		return response
			.status(400)
			.json({ error: "required field 'medicationId' needs to be a number, please correct and send request again" });
	};

	pool.query('SELECT medication, dose, freq, notes, "inUse" FROM medication WHERE id = $1', [medicationId], (error, results) => {
		if (error) {
			return response.status(400).send(error.detail);
		}
		response.status(200).json(results.rows);
	});


};

module.exports = {
	getUsersMedications,
	createNewMedication,
	getMedicationDetails,
};
