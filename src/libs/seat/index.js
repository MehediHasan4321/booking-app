const { Seats } = require("../../model");
const { badRequest } = require("../../utils/error");
const { generateSeat } = require("./utils");

/**
 * This function will crate a list of seat of a bus.
 * @param {String} ownerID
 * @param { String} busID
 * @param { Number} numberOfSeat
 *  
 */

const createSeat = async ({ ownerID, busID, numberOfSeat = 1 }) => {
  const busSeats = generateSeat(numberOfSeat);
  const seat = new Seats({
    busID,
    ownerID,
    seat: busSeats,
  });

  await seat.save();
};

/**
 * findSeatsByBusId
 * @param {string} busId
 * @returns {Object} Seates
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
  const seat = await Seats.findOne({ busID: busId });
  
  
  await seat.deleteOne();
};





/**
 * Update Seat Properties by busID and seat date like seat name and date;
 * @param {string} busID
 * @param {string} seat
 * @param {string} date
 * @returns {Promise}
*/

const updateSeatPropertie = async (busID, { seat, date }) => {
  const busSeat = await findSeatsByBusId(busID);
  busSeat.seat.forEach((item) => {
    if (item.name === seat) {
      if (item.booking.includes(date)){
        throw badRequest("This seat already Booked");
      }

      item.booking.push(date);

      return item;
    }
  });

  await busSeat.updateOne({ seat: busSeat.seat });
  await busSeat.save();
};



const removeDateFromSeat = async ({ busID, seatName, date }) => {
  
  const busSeat = await findSeatsByBusId(busID);
  busSeat.seat.forEach((item) => {
    if (item.name === seatName) {

      if (!item.booking.includes(date)){
        throw badRequest(`You did't booked the seat`);
      }

        
      item.booking = item.booking.filter((d) => d !== date);
      

      return item;
    }
  });




  await busSeat
    .updateOne({ seat: busSeat.seat })
    .then(async () => {
      await busSeat.save();
    })
    .catch((e) => {
      throw badRequest("[Booking Remove]", e.message);
    });
};

module.exports = {
  updateSeatPropertie,
  createSeat,
  updateSeatQuantity,
  deleteSeat,
  removeDateFromSeat,
};
