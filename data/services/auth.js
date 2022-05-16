const { pool } = require('../connection');
const bcrypt = require('bcrypt');

const login = async (request, response) => {
  const { email, password } = request.body;

  try {
    const getUserCredentialQuery = `
    SELECT credentials.hashed_password AS hash, credentials.salt AS salt
    FROM credential
    INNER JOIN users ON users.id = credentials.user_id
    WHERE users.email = $1
    `;

    const getUserCredential = await pool.query(getUserCredentialQuery, [email]);

    if (!getUserCredential.rowCount) {
      return response.status(400).send("Incorrect email or password. Please use valid credentials");
    }

    const hashStored = getUserCredential.rows[0].hash;
    const salt = getUserCredential.rows[0].salt;
    const hashGiven = await bcrypt.hash(password, salt);

    const isValidPassword = hashStored === hashGiven;

    if (isValidPassword) {
      return response.status(201).send(`User ${email} authorised`);
    } else {
      return response.status(400).send("Incorrect email or password. Please use valid credentials");
    }
  } catch (e) {
    return response.status(500).send(e.message);
  }
};

module.exports = {
  login
};
