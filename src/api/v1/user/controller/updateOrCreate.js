const userService = require("../../../../libs/user");

const updateOrCreate = async (req, res, next) => {
  const id = req.params.id;
  const {name,avater='',phone='',role='user',status='pending'} = req.body;

  try {
    const {user,code} = await userService.updateOrCreate(id,{name,avater,phone,role,status});
    const response = {
      code,
      message: code === 200 ? "User Update Successful" : "User Created",
      data: {
        user
      },
      links: {
        self: `/users/${user._id}`,
      },
    };
    res.status(code).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateOrCreate;
