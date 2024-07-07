const busService = require("../../../../libs/bus");
const removeItem =async (req, res, next) => {
  const id = req.params.id;

  try {
   await busService.removeItem(id);

    res.status(204).json({
      code: 204,
      message: "Resource Delete Successfully",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
