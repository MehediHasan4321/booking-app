const bookingService = require("../../../../libs/booking");
const create = async (req, res, next) => {
  const { date, to, from, seat, busId } = req.body;
  try {
    const booking = await bookingService.create({
        date,
        to,
        from,
        seat,
        busId,
        userId: req.user._id,
      });

      const response = {
        code: 201,
        message:'Success',
        data:booking,
        links:{
          self:`/bookings/${booking._id}`,
          bus:`/buses/${busId}`,
          seat:`/bookings/${booking._id}/seats`

        }
      }

      res.status(201).json(response)
  } catch (e) {
    next(e)
  }
};

module.exports = create;
