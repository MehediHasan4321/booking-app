const { Booking } = require("../../model");

const hasBooking = async (bookingId) => {
    const booking = await Booking.findById(bookingId);
    return booking ? booking : false;
  };

  

  module.exports={
    hasBooking
  }