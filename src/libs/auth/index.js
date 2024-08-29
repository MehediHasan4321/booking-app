const { generateHashing, compareHash } = require("../../utils/hashing");
const { userExist, createUser, findUserByEmail } = require("../user");
const { badRequest } = require("../../utils/error");
const { generateToken } = require("../token");

const register = async ({ name, email, password }) => {
  const hasUser = await userExist(email);

  if (hasUser) {
    throw badRequest("User already Exist");
  }

  password = await generateHashing(password);

  const user = await createUser({ name, email, password });
  return user;
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw badRequest("Invalid Credientials");
  }

  const isMatch = await compareHash(password, user.password);

  if (!isMatch) {
    throw badRequest("Invalid Credientials");
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  return generateToken({ payload });
};

const changePassword = async (email, currentPassword, newPassword) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw badRequest("Invalid Credientials");
  }
  const isMatchPass = await compareHash(currentPassword, user.password);
  if (!isMatchPass) {
    throw badRequest("Invalid Credientials");
  }

  newPassword = generateHashing(newPassword);

  user.overwrite({ password: newPassword });

  await user.save();

  return {message:'Your password has been changed'}
};

/**
 * forgetPassword function will give a chance to user to reset his/her password
 * if he/her pass a valid email
 * @param {string} email
 */

const forgetPassword = async (email) => {
  const user = await findUserByEmail(email);
  if (user) {
    //TODO: Sent an Email to user to reset password
  }

  throw badRequest("Invalid Email you pass!");
};

module.exports = {
  register,
  login,
  forgetPassword,
  changePassword,
};
