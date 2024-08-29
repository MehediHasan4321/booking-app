const { hashSync } = require("bcryptjs");
const Review = require("../../model/Review");
const { badRequest, notFound } = require("../../utils/error");
const {
  isExistBus,
  checkBookingStatusByBookingId,
  isExistReview,
  gretterThanZeroAndLessThenFive,
} = require("./utils");

/**
 * This create function will create a review based on userID, busID, and bookingID
 * @param {string} param0
 * @returns
 */

const create = async ({
  message = "",
  rating = 0,
  userID,
  busID,
  status='published',
  bookingID,
}) => {

  // First find out the booking based on bookingID
  // Second check the booking status if booking status is completd then move forward next step
  // third chek the bus id and  the booking busID same or not if same the create a booking if not thorw an Error.

  if (!userID || !busID || !bookingID || !message){
    throw badRequest("Some required field is missing!");
  }
    

  rating = gretterThanZeroAndLessThenFive(rating)

  const hasBooking = await  checkBookingStatusByBookingId(bookingID)
  
  if(hasBooking.user === userID ) {
    console.log('yes ')
  }else{
    console.log(hasBooking.user)
    console.log('not match')
  }
  
  if (hasBooking === false){
    throw badRequest("You did not complete the booking");
  }

  const hasBus = await isExistBus(busID)


  if (hasBus===false) throw badRequest("This bus dose not exist!");
  
  const review = new Review({
    message,
    rating,
    userID,
    bookingID,
    busID,
    status
  });

  
  

  await review.save();

  return review;

  
  
};

/**
 * findAll function will retrieve all reviews
 */

const findAll = async (busID) => {
  if (busID) {
    const reviews = await Review.find({ busID }).populate(
      "userID",
      select["name"]
    );
    return reviews._doc;
  }

  const reviews = await Review.find();

  // TODO: Implement pagination it in future

  return reviews;
};



/**
 * UpdateOrCreate will update a hole review if it exist. But if review can not find by reviewID it will create a new review.
 * @param {string} reviewID 
 * @param {Object} param1 
 * @returns {Object}
 */

const updateOrCreate = async (
  reviewID,
  { message, rating, status, userID, busID, bookingID }
) => {
  if (!reviewID) {
    throw badRequest("ID is required to update a Review");
  }

  const reviewData = await isExistReview(reviewID);

  if (!reviewData) {
    const newReview = await create({
      message,
      rating,
      userID,
      busID,
      bookingID,
    });

    return { review: newReview, status: 201 };
  }

  const payload = {
    message,
    rating,
    status,
  };

  reviewData.overwrite(payload);

  await reviewData.save();

  return { review: reviewData, status: 200 };
};

/**
 * UpdatePropertie will update a propertie of an existing review based on reviewID.
 * @param {String} reviewID 
 * @param {Object} param1 
 * @returns Review
 */

const updatePropertie = async (reviewID, { message, rating, status }) => {
  if (!reviewID) {
    throw badRequest("ID is required to update a Review");
  }

  const reviewData = await isExistReview(reviewID);

  if (!reviewData) {
    throw notFound("This review does not exist!");
  }

  reviewData.review = message ?? reviewData.message;
  reviewData.rating = rating ?? reviewData.rating;
  reviewData.status = status ?? reviewData.status;

  await reviewData.save();

  return reviewData;
};


/**
 * remove function will delete a Review based on reviewID.
 * @param {String} reviewID 
 */

const remove = async (reviewID) => {
  if (!reviewID) {
    throw badRequest("Id is required to delete a Review");
  }

  const reviewData = await isExistReview(reviewID);

  if (!reviewData) {
    throw notFound("Review is not found!");
  }

  await reviewData.deleteOne();
};

module.exports = {
  create,
  findAll,
  updateOrCreate,
  updatePropertie,
  remove,
};
