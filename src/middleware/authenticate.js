const { verifyToken } = require("../libs/token");
const { findUserByEmail } = require("../libs/user");
const { authenticationError } = require("../utils/error");

const authenticate = async (req, _res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = verifyToken({ token });

    const user = await findUserByEmail(decoded.email);
    if (!user) {
      next(authenticationError("User does't exist"));
    }

    if (user.status !== "approved") {
      next(authenticationError(`Your account is ${user.status}`));
    }

    req.user = decoded;

    next();
  } catch (e) {
    next(authenticationError());
  }
};

module.exports = authenticate;
