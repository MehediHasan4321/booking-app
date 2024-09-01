const busServices = require("../../../../libs/bus");



const create = async (req, res, next) => {
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
    const bus = await busServices.create({
      name,
      busNumber,
      image,
      seatImage,
      seatClass,
      seatPatten,
      isAc,
      seatQtn,
      price,
      ownerID: req.user._id,
    });

    const responses = {
      code: 201,
      message: "Bus created Successful",
      data: {
        ...bus
      },
      links: {
        self: `/buses/${bus._id}`,
        seat: `/buses/${bus._id}/seats`,
      },
    };

    res.status(201).json(responses);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
