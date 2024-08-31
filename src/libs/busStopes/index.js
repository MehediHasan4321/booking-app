const BusStopes = require("../../model/BusStopes");
const { badRequest, notFound } = require("../../utils/error");
const { isExistBus } = require("../review/utils");
const { busHasAlreadyStopes } = require("./utils");

const create = async ({ busID = "", stopes = [], sheft = "", date = "" }) => {
  // const hasBus = isExistBus(busID)
  if ((busID, !sheft)) {
    throw badRequest("Some required fields are missing!!");
  }

  // if(!hasBus){
  //     throw notFound('Invalid busID')
  // }

  //Check the bus stopes have or not alredy

  const hasStopes = await busHasAlreadyStopes(busID);
 

  if (hasStopes) {
    throw badRequest("This bus already has stopes");
  }

  if (stopes.length < 2) {
    throw badRequest("Stopes needs atlest 2 stopes");
  }

  const busStopes = await new BusStopes({ busID, date, sheft, stopes });

  await busStopes.save();

  return busStopes._doc;
};

module.exports = {
  create,
};
