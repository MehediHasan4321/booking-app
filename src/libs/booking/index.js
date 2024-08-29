const { Booking } = require("../../model");
const { badRequest, notFound } = require("../../utils/error");
const { updateSeatPropertie, removeDateFromSeat } = require("../seat");
const { isValidLocation } = require("../bus");

/**
 * FindAll Function return us our booking base on your params
 * @param {string} sortBy
 * @param {string} sortKey
 * @param { string} status
 * @param {string} search
 * @returns {Promise} booking
 */

const findAll = async ({
  sortBy = "dsc",
  sortKey = "createdAt",
  status = "pending",
  search = "",
}) => {
  const sortStr = `${sortBy === "dsc" ? "-" : ""}${sortKey}`;

  const booking = await Booking.find()
    .populate({ path: "user", select: "name" })
    .sort(sortStr);

  return booking;
};

/**
 * Create function will create a booking base on our passing value
 * @param { Date} data
 * @param { string} to
 * @param {string} from
 * @param {string} seat
 * @param { string} busId
 * @param {string} busId
 * @returns {Promise} booking
 */

const create = async ({ date, to, from, seat, busId, userId }) => {
  if (!date || !to || !from || !seat || !busId || !userId)
    throw badRequest("Some required fields are missing!");

  const isValid = await isValidLocation(busId, { from, to });

  if (!isValid)
    throw badRequest(
      "This bus is not going to your location, Plz Select Another"
    );

    //TODO: Check first the bus seat is available or not base on date


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

/**
 * findSingle give us a single booking info base on booking id
 * @param {string} id
 * @returns {Promise} booking
 */

const findSingle = async (id) => {
  const booking = await Booking.findById(id).populate([
    { path: "user", select: "name" },
    { path: "busId", select: "name" },
  ]);
  if (!booking) throw notFound();

  return booking;
};

/**
 * updateOrCreate function will update our booking if booking will not found then base on information a new booking will created.
 * @param {string} id
 * @param { Date} date
 * @param {string} to
 * @param { string} from
 * @param { string} seat
 * @param { string } busId
 * @param { string} userId
 * @param {string} status
 * @returns {Promise} booking
 */

const updateOrCreate = async (
  id,
  { date, to, from, seat, busId, userId, status = "pending" }
) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    const newBooking = await create({ date, to, from, seat, userId, busId });
    const data = newBooking._doc;
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




const updatePropertie = async (id, { date, to, from, seat, status, busId }) => {
  const booking = await Booking.findById(id);

  if (!booking) {
    throw notFound();
  }

  if (booking.seat !== seat) {
    await removeDateFromSeat({ busId, seatName: booking.seat, date });
    await updateSeatPropertie(busId, { seat, date });
  }

  if (status === "completed") {
    // TODO: Sent a mail to get Rating or Review from the User. How satistied with our services.
    await removeDateFromSeat({ busId, seatName: booking.seat, date });
  }

  (booking.date = date ?? booking.date),
    (booking.to = to ?? booking.to),
    (booking.from = from ?? booking.from),
    (booking.seat = seat ?? booking.seat),
    (booking.status = status ?? booking.status),
    await booking.save();

  return booking._doc;
};

const removeBooking = async (id) => {
  if (!id) {
    throw badRequest("To perform the action Id must needed");
  }
  const booking = await Booking.findById(id);

  if (!booking) {
    throw notFound();
  }
  
  
  await removeDateFromSeat({
    busId: booking.busId,
    seatName: booking.seat,
    date: booking.date,
  })
    .then(async () => {
      await booking.deleteOne();
    })
    .catch((e) => {
      throw badRequest(`[Booking Delete Error],${e.message}`);
    });
};

module.exports = {
  findAll,
  create,
  findSingle,
  updateOrCreate,
  updatePropertie,
  removeBooking,
};
