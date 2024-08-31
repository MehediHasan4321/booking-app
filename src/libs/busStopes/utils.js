const Bus = require("../../model/Bus");
const BusStopes = require("../../model/BusStopes");

/**
 * This function will check the bus is exist or not
 * @param {string} busID
 * @return { boolean}
 */

const isExistBus = async (busID) => {
  const bus = await Bus.findById(busID);
 
  
  return bus ? true : false;
};

const busHasAlreadyStopes = async(busID)=>{
  const stopes = await BusStopes.find({busID})
 
  return stopes.length===0?false:true
  
}

module.exports = {
  isExistBus,
  busHasAlreadyStopes,
};
