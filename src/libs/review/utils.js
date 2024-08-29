const { Booking } = require("../../model");
const Bus = require("../../model/Bus");
const Review = require("../../model/Review");
const { badRequest } = require("../../utils/error");

/**
 * This function will return a true or false if bus exit or not based on busID
 * @param {string} busID
 * @returns {boolean}
 */

const isExistBus = async (busID) => {
  const bus = await Bus.findById(busID);

  if (bus) {
    return true;
  }
  return false;
};

/**
 * This function will confirm that the user has completed the booking and he/her has right permission to review
 * @param {string} bookingID
 * @param {string} userID
 * @returns {boolean | object}
 */

const checkBookingStatusByBookingId = async (bookingID) => {
  const booking = await Booking.findById(bookingID);

  if (booking) {
    if (booking.status === "completed") {
      return booking;
    }
  }

  return false;
};

const isExistReview = async (reviewID) => {
  const review = Review.findById(reviewID);

  return review ? review : false;
};

/**
 * This function will check the number is gretter then 0 and less then 5
 * @param {number} number
 * @returns {number}
 */

const gretterThanZeroAndLessThenFive = (number) => {
  if (number > 0 && number <= 5) {
    return number;
  }
  throw badRequest();
};

module.exports = {
  isExistBus,
  checkBookingStatusByBookingId,
  isExistReview,
  gretterThanZeroAndLessThenFive,
};
