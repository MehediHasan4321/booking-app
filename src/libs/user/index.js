const User = require("../../model/User");
const { badRequest } = require("../../utils/error");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user ? user : false;
};

const userExist = async (email) => {
  const user = await findUserByEmail(email);

  return user ? true : false;
};

const createUser = async ({
  name,
  email,
  password,
  role = "user",
  status = "pending",
}) => {

    if(!name||!email||!password){
        throw badRequest('Invalid Credentials')
    }


  const user = new User({ name, email, password, role, status });

  await user.save();

  return user._doc;
};

module.exports = {
  userExist,
  createUser,
  findUserByEmail,
};
