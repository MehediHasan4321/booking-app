const bookingService = require("../../../../libs/booking");

const updateOrCreate = async (req, res, next) => {
  const id = req.params.id;
  const { date, to, from, seat, status = "pending",busId } = req.body;

  try {
    const { booking, code } = await bookingService.updateOrCreate(id,{
      date,
      to,
      from,
      seat,
      status,
      busId,
      userId: req.user._id,
    });

    const response = {
      code,
      message:
        code === 201 ? "New Booking Created" : "Booking update Successfully",
      data: {
        ...booking,
      },
      links: {
        self: `/bookings/${booking._id}`,
        bus: `/bookings/${booking._id}/buses`,
        seat: `/bookings/${booking._id}/seats`,
      },
    };

    res.status(code).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateOrCreate;
