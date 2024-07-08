const User = require("../../model/User");

const transformUser = (user={})=>{
    const result = {...user}
    delete result.password
    return result
}

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
  
    return user ? user : false;
  };
  
  const userExist = async (email) => {
    const user = await findUserByEmail(email);
  
    return user ? true : false;
  };

  const findById = async(id)=>{
    const user = await User.findById(id);
    return user
  }

module.exports = {
    transformUser,
    findUserByEmail,
    userExist,
    findById,
}