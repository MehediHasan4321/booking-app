const User = require("../../model/User");
const { badRequest, notFound } = require("../../utils/error");
const {
  transformUser,
  findUserByEmail,
  userExist,
  findById,
} = require("./utils");


/**
 * CreateUser function create an user based on valid credientials.
 * @param {String} name 
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @param {string} status
 * @returns {User}
 */
const createUser = async ({
  name,
  email,
  password,
  role = "user",
  status = "pending",
}) => {
  if (!name || !email || !password) {
    throw badRequest("Invalid Credentials");
  }

  if(!email.includes('@')){
    throw badRequest('Invalid Email')
  }

  const user = new User({ name, email, password, role, status });

  await user.save();

  return user._doc;
};

const findAll = async ({
  sortType = "dsc",
  sortBy = "updatedAt",
  role = "user",
  status = "pending",
  search = "",
}) => {
  const filter = { name: { $regex: search, $options: "i" } };
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  const user = await User.find(filter).sort(sortStr);
  const response = user.map((item) => transformUser(item._doc));

  return response;
};

const findSingle = async (id) => {
  const user = await findById(id);

  if (!user) throw notFound();

  // TODO: Find all bookings base on this user id
  const response = {
    ...transformUser(user._doc),
    booking: [],
  };

  return response;
};

const updateOrCreate = async (
  id,
  { name, phone = "", avater = "", role = "user", status = "pending" }
) => {
  const user = await findById(id);
  if (!user) {
    //TODO: Create an user if user dose not exist!

    throw notFound();
  }

  if (!name) throw badRequest("Name is required to update user");

  const payload = {
    name,
    phone,
    role,
    status,
    avater,
    password: user.password,
    email: user.email,
  };

  user.overwrite(payload);

  await user.save();
  const updatedUser = transformUser(user._doc);
  return {
    code: 200,
    user: updatedUser,
  };
};

const updatePropertie = async (id, { name, phone, avater, role, status }) => {
  const user = await findById(id);
  if (!user) throw notFound();

  user.name = name ?? user.name;
  user.phone = phone ?? user.phone;
  user.avater = avater ?? user.avater;
  user.role = role ?? user.role;
  user.status = status ?? user.status;

  await user.save();

  return transformUser(user._doc)
};

const remove = async (id)=>{
  const user = await findById(id)

  if(!user) throw notFound()
  
   await User.findByIdAndDelete(id)
}


module.exports = {
  userExist,
  createUser,
  findUserByEmail,
  findAll,
  findSingle,
  updateOrCreate,
  updatePropertie,
  remove,
};
