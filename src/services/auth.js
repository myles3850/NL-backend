const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // https://www.npmjs.com/package/jsonwebtoken

const { pool } = require('../database/connection');
const { message, httpStatusCode } = require('../utils/constants');

const login = async (request, response) => {
  const { email, password } = request.body;
  const responseObj = {
    success: false
  }

  try {
    const getUserCredentialQuery = `
      SELECT
        credentials.hashed_password,
        credentials.salt,
        users.name,
        users.id
      FROM credentials
      INNER JOIN users ON users.id = credentials.user_id
      WHERE users.email = $1
    `;

    const userCredential = await pool.query(getUserCredentialQuery, [email]);

    if (!userCredential.rowCount) {
      responseObj.message = message.INCORRECT_CREDENTIALS
      return response.status(httpStatusCode.UNAUTHORIZED).send(responseObj);
    }

    // postgres doesn't support aliases in camelCase,
    // so we have to create constants from db columns returned...
    const { hashed_password, salt, name, id } = userCredential.rows[0];
    const hashStored = hashed_password;
    const userName = name;
    const userId = id;
    
    const hashGiven = await bcrypt.hash(password, salt);
    const isValidPassword = hashStored === hashGiven;

    if (!isValidPassword) {
      responseObj.message = message.INCORRECT_CREDENTIALS
      return response.status(httpStatusCode.FORBIDDEN).send(responseObj);
    }

    const jwtPayload = {
      userName,
      email,
      userId
    };
    const jwtKey = process.env.JWT_KEY;
    const jwtToken = jwt.sign(jwtPayload, jwtKey, {
      algorithm: "HS256",
      expiresIn: "30min"
    });

    responseObj.success = true;
    responseObj.message = message.AUTHORISED;
    responseObj.token = jwtToken;

    return response.status(httpStatusCode.CREATED).send(responseObj);
  } catch (e) {
    responseObj.error = e.message;
    return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseObj);
  }
};

module.exports = {
  login
};
