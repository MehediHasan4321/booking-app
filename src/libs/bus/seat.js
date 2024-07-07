const { generateSeat } = require("./utils");
const { Seats } = require("../../model");

const createSeat = async ({ ownerId, busId, numberOfSeat = 1 }) => {
  const busSeats = generateSeat(numberOfSeat);
  const seat = new Seats({
    busId,
    ownerId,
    seat: busSeats,
  });

  await seat.save();
};

const updateSeat = async ({ busId, seatQuantity }) => {
  const busSeats = generateSeat(seatQuantity);

  const seat = await Seats.findOne({ busId: busId });

  await seat.updateOne({ seat: busSeats });

  await seat.save();
};

const deleteSeat = async (busId) => {
  const seat = await Seats.findOne({ busId: busId });

  await seat.deleteOne();
};

module.exports = {
  createSeat,
  updateSeat,
  deleteSeat,
};
