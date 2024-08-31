const BusStopes = require("../../model/BusStopes");
const { badRequest, notFound } = require("../../utils/error");
const { isExistBus } = require("../review/utils");
const { busHasAlreadyStopes } = require("./utils");




/**
 * This function will create a busStopes for a bus
 * @param {string} busID
 * @param {Array} stopes
 * @param { String} sheft
 * @param { String} data 
 * @returns {Object}
 */
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


/**
 * This function will return a busStopes based on busID
 * @param {String} busID
 * @return {Object}
 */

const findSingle = async (busID)=>{
  if(!busID){
    throw badRequest('busID must need to get busStopes')
  }
  const stopes = await BusStopes.find({busID})

  

  return stopes[0]._doc
}


const updateOrCreate = async (id,{busID,date,sheft,stopes=[]})=>{
  if(!id){
    throw badRequest('busStopes is required to update')
  }

  const busStopes = await BusStopes.findById(id)



  if(!busStopes){
    const newBusStopes = await create({busID,stopes,sheft,date})
    return {busStopes:newBusStopes,code: 201}
  }

  if(stopes.length<2){
    throw badRequest('Bus stopes need atlest two')
  }

  // TODO: Check the bus is exist or not based on busID.





  const payloay = {
    busID:busStopes.busID,
    date,
    sheft,
    stopes
  }

  busStopes.overwrite(payloay)

  await busStopes.save()

  return {busStopes:busStopes._doc,code:200}

}


module.exports = {
  create,
  findSingle,
  updateOrCreate,
};
