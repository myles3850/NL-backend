const { pool } = require("../database/connection");
const { httpStatusCode } = require("../utils/constants");

//this endpoint gathers all medication for a given user, takes the parameters ID to assign to the user queried
const getUsersMedications = (request, response) => {
	//validation to see if ID field has been entered as parameter in request
	const userId = parseInt(request.query.ID);
	if (!request.query.ID) {
		return response
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error: "required field 'ID' missing, please correct and send request again" });
	};
	//validation to check the paramter is a number only
	if (isNaN(userId)) {
		return response
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error: "required field 'ID' needs to be a number, please correct and send request again" });
	};

	pool.query('SELECT id, medication, dose, freq FROM medication WHERE "userId" = $1 AND "inUse" = true', [userId], (error, results) => {
		if (error) {
			return response.status(httpStatusCode.BAD_REQUEST).send(error.detail);
		}
		response.status(httpStatusCode.OK).json(results.rows);
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
				return response.status(httpStatusCode.BAD_REQUEST).send(error.detail);
			}
			response.status(httpStatusCode.OK).json(results.rows);
		}
	);
};

const getMedicationDetails = (request, response) => {
	const medicationId = parseInt(request.params.medicationId);
	//validation to check the paramter is a number only
	if (isNaN(medicationId)) {
		return response
			.status(httpStatusCode.BAD_REQUEST)
			.json({ error: "required field 'medicationId' needs to be a number, please correct and send request again" });
	};

	pool.query('SELECT medication, dose, freq, notes, "inUse" FROM medication WHERE id = $1', [medicationId], (error, results) => {
		if (error) {
			return response.status(httpStatusCode.BAD_REQUEST).send(error.detail);
		}
		response.status(httpStatusCode.OK).json(results.rows);
	});
};

const setMedicationNotInUse = (request, response) => {
	const medicationId = parseInt(request.query.medicationId);

	pool.query('UPDATE medication SET "inUse" = false WHERE id = $1', [medicationId], (error, results) => {
		if (error){
			return response.status(httpStatusCode.BAD_REQUEST).send(error.detail);
		}
		return response.status(httpStatusCode.OK).json({message:'medication disabled'});
	});
};

module.exports = {
	getUsersMedications,
	createNewMedication,
	getMedicationDetails,
};
