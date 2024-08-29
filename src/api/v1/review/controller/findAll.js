const reviewService = require("../../../../libs/review");

const findAll = async (req, res, next) => {
  const { busID } = req.params;

  try {
    const review = await reviewService.findAll(busID);

    const response = {
      message: "Success",
      data: review,
      links: {
        self: req.url,
        bus: req.url,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findAll;
