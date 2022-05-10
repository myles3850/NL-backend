const { pool } = require('../connection');

const getUsersMedications = (request, response) => {
	pool.query("SELECT * FROM medication", (error, results) => {
		if (error) {
			throw error;
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
