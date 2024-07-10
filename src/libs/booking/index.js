const { Booking } = require("../../model");
const { badRequest, notFound } = require("../../utils/error");
const { updateSeatPropertie, removeDateFromSeat } = require("../seat");
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
  const booking = await Booking.findById(id).populate([
    { path: "user", select: "name" },
    { path: "busId", select: "name" },
  ]);
  if (!booking) throw notFound();

  return booking;
};

const updateOrCreate = async (
  id,
  { date, to, from, seat, busId, userId, status = "pending" }
) => {
  /**
   * Get the all value from request body and pass it to services.
   * Find out the  bookings base on the booking Id.
   * If booking does not exist, Create a new bookin using given value.
   * If booking dose exist then update the hole booking
   * If user want update his booded seat then first check the seat is available  or not.
   * If seat available then remove first from previous seat booking list then booked new one.
   */
  const booking = await Booking.findById(id);
  if (!booking) {
    
    const newBooking = await create({ date, to, from, seat, userId, busId });
    const data = newBooking._doc
    return { booking: data, code: 201 };
  }

  const payload = {
    date,
    to,
    from,
    seat,
    busId: booking.busId,
    user: booking.user,
    status,
  };

  if (booking.seat !== seat) {
    await removeDateFromSeat({ busId, seatName: booking.seat, date });
    await updateSeatPropertie(busId, { seat, date });
  }
  
  booking.overwrite(payload);

  await booking.save();
  const data = booking._doc;
  return { booking: data, code: 200 };
};

module.exports = {
  findAll,
  create,
  findSingle,
  updateOrCreate,
};
