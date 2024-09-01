const busService = require("../../../../libs/bus");

const updateByPatch = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    busNumber,
    image,
    seatImage,
    isAc,
    price,
    seatClass,
    seatQtn,
    seatPatten,
  } = req.body;

  try {
    const updatedData = await busService.updatePropertie(id, {
      name,
      busNumber,
      image,
      seatImage,
      isAc,
      price,
      seatClass,
      seatQtn,
      seatPatten,
    });

    const response = {
      code: 200,
      message: "Update Success",
      data: {
        updatedData,
      },
      links: {
        self: req.url,
        seat: `/buses/${id}/seats`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateByPatch;
