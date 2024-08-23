const { Seats } = require("../../model");
const { badRequest } = require("../../utils/error");
const { generateSeat } = require("./utils");

const createSeat = async ({ ownerId, busId, numberOfSeat = 1 }) => {
  const busSeats = generateSeat(numberOfSeat);
  const seat = new Seats({
    busId,
    ownerId,
    seat: busSeats,
  });

  await seat.save();
};

/**
 * findSeatsByBusId
 * @param {string} busId
 * @returns {Array} Seates
*/

const findSeatsByBusId = async (busId) => {
  return await Seats.findOne({ busId: busId });
};



/**
 * Update Seat Quantity base on busId and seatQuantity
 * @param {string} busId
 * @param {number} seatQuantity
 * @returns {Promise} 
*/

const updateSeatQuantity = async ({ busId, seatQuantity }) => {
  const busSeats = generateSeat(seatQuantity);

  const seat = await findSeatsByBusId(busId);

  await seat.updateOne({ seat: busSeats });

  await seat.save();
};



/**
 * Delete Seat by passing busId
 * @param {string} busId
 * @returns {Promise}
*/

const deleteSeat = async (busId) => {
  const seat = await Seats.findOne({ busId: busId });

  await seat.deleteOne();
};


/**
 * find Seats by passing busId
 * @param {string} busId
 * @returns {Promise}
*/
const find = async (busId) => {
  return await Seats.findOne({ busId: busId });
};


/**
 * Update Seat Properties by busId and seat date like seat name and date;
 * @param {string} busId
 * @param {string} seat
 * @param {string} date
 * @returns {Promise}
*/

const updateSeatPropertie = async (busId, { seat, date }) => {
  const seats = await findSeatsByBusId(busId);
  seats.seat.forEach((item) => {
    if (item.name === seat) {
      if (item.booking.includes(date)){
        throw badRequest("This seat already Booked");
      }
        

      item.isBooked = true;
      item.booking.push(date);

      return item;
    }
  });

  await seats.updateOne({ seat: seats.seat });
  await seats.save();
};



const removeDateFromSeat = async ({ busId, seatName, date }) => {
  
  const seats = await findSeatsByBusId(busId);
  seats.seat.forEach((item) => {
    if (item.name === seatName) {

    

      if (!item.booking.includes(date)){
        throw badRequest(`You did't booked the seat`);
      }

        
      item.booking = item.booking.filter((d) => d !== date);
      item.booking.length === 0 ? (item.isBooked = false) : item.isBooked;
      
      return item;
    }
  });




  await seats
    .updateOne({ seat: seats.seat })
    .then(async () => {
      await seats.save();
    })
    .catch((e) => {
      throw badRequest("[Booking Remove]", e.message);
    });
};

module.exports = {
  find,
  updateSeatPropertie,
  createSeat,
  updateSeatQuantity,
  deleteSeat,
  removeDateFromSeat,
};
