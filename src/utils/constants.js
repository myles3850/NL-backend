const message = Object.freeze({
  INCORRECT_CREDENTIALS: "Incorrect credentials, please use a valid one",
  AUTHORISED: "Authorized",
  INVALID_REQUEST: "Request Invalid"
});

const httpStatusCode = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500
})

module.exports = {
  message,
  httpStatusCode
}
