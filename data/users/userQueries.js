const { pool } = require('../connection');
const bcrypt = require('bcrypt');

const getUsers = (request, response) => {
	pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
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

const createUser = async (request, response) => {
	const { name, email, password } = request.body;

  try {
    const insertUserQuery = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id";
    const insertUser = await pool.query(insertUserQuery, [name, email]);

    const userId = insertUser.rows[0].id;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const insertCredentialQuery = "INSERT INTO credential (user_id, salt, hashed_password) VALUES ($1, $2, $3)";
    await pool.query(insertCredentialQuery, [userId, salt, hash]);

    return response.status(201).send(`User: ${name} created successfully`);
  } catch (e) {
    return response.status(500).send(e.detail);
  }
};

const updateUser = (request, response) => {
	const id = parseInt(request.params.id);
	const { name, email } = request.body;

	pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [name, email, id], (error, results) => {
		if (error) {
			response.status(400).send(error.detail);
		} else {
			response.status(200).send(`User modified with ID: ${id}`);
		}
	});
};

const deleteUser = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`User deleted with ID: ${id}`);
	});
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
