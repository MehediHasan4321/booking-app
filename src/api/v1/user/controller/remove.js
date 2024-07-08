const userService = require("../../../../libs/user");
const remove = async (req, res, next) => {
  const id = req.params.id;
  
  try {
    await userService.remove(id);

  res.status(204).json({
    code: 204,
    message: "Item delete successfully"
  });
  } catch (e) {
    next(e);
  }
};

module.exports = remove;
