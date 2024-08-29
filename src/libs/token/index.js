const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");

const generateToken = ({
  payload,
  secrect = process.env.ACCESS_TOKEN_SECRECT,
  algorithm = "HS256",
  expiresIn = "1h",
}) => {
  try {
    return jwt.sign(payload, secrect, { algorithm, expiresIn });
  } catch (e) {
    console.log("[JWT]", e.message);
    throw serverError();
  }
};

const verifyToken = ({
  token,
  algorithm = "HS256",
  secrect = process.env.ACCESS_TOKEN_SECRECT,
}) => {
  try {
    return jwt.verify(token, secrect, { algorithms: [algorithm] });
  } catch (e) {
    console.log("[JWT]", e.message);
    throw serverError();
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
