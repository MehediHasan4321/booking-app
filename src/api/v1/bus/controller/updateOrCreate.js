const busService = require("../../../../libs/bus");
const updateOrCreate = async (req, res, next) => {
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
    ownerID,
    seatPatten,
  } = req.body;
  try {
    const { bus, status } = await busService.updateOrCreate(id, {
      name,
      busNumber,
      image,
      seatImage,
      isAc,
      price,
      seatClass,
      seatQtn,
      ownerID,
      seatPatten,
      ownerID: req.user._id,
    });

    const response = {
      code: status,
      message:
        status === 200 ? "Bus updated sucessfully" : "Bus created successfully",
      data: {
        ...bus,
      },
      links: {
        self: `/buses/${bus._id}`,
        seat: `/buses/${bus._id}/seats`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateOrCreate;
