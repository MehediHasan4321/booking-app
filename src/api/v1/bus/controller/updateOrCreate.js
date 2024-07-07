const busService = require("../../../../libs/bus");
const updateOrCreate = async (req, res, next) => {
  const id = req.params.id;

  const {
    name,
    isAc = false,
    stopes = [],
    totalSeat,
    seatPrice,
    seatClass = "ecnomic",
  } = req.body;
  try {
    const { bus, status } = await busService.updateOrCreate(id, {
      name,
      isAc,
      stopes,
      totalSeat,
      price: seatPrice,
      seatClass,
      ownerId: req.user._id,
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
