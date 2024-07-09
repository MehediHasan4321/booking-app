const { Booking } = require("../../model");
const { badRequest, notFound } = require("../../utils/error");
const { updateSeatPropertie } = require("../seat");
const { isValidLocation } = require("../bus");

const findAll = async ({
  sortBy = "dsc",
  sortKey = "createdAt",
  status = "pending",
  search = "",
}) => {
  const sortStr = `${sortBy === "dsc" ? "-" : ""}${sortKey}`;
  const filter = {};

  const booking = await Booking.find()
    .populate({ path: "user", select: "name" })
    .sort(sortStr);

  return booking;
};

const create = async ({ date, to, from, seat, busId, userId }) => {
  if (!date || !to || !from || !seat || !busId || !userId)
    throw badRequest("Some required fields are missing!");

  const isValid = await isValidLocation(busId, { from, to });

  if (!isValid)
    throw badRequest(
      "This bus is not going to your location, Plz Select Another"
    );

  await updateSeatPropertie(busId, { seat, date });

  const booking = new Booking({
    busId,
    date,
    from,
    seat,
    status: "pending",
    to,
    user: userId,
  });
  await booking.save();
  return booking;
};

const findSingle = async (id) => {
  const booking = await Booking.findById(id).populate([{path:'user',select:'name'},{path:'busId',select:'name'}])
  if(!booking) throw notFound()

    return booking 
};

module.exports = {
  findAll,
  create,
  findSingle,
};
