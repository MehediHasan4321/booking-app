const { Bus } = require("../../model");
const { createSeat, updateSeatQuantity, deleteSeat } = require("../seat");
const seatService = require("../seat");
const { badRequest, notFound } = require("../../utils/error");

/**
 * This function will create a new bus.
 * @param {string} name
 * @param {string} busNumber
 * @param {string} image
 * @returns {object}
 */

const create = async ({
  name = "",
  busNumber = "",
  image = "",
  seatImage = [],
  isAc = false,
  price = 1,
  seatClass = "ecnomic",
  seatQtn = 1,
  ownerID,
  seatPatten = "2:2",
}) => {
  if (!ownerID) {
    throw badRequest("Each Bus need to an owner");
  }

  if (!name || !busNumber || !price || !seatQtn) {
    throw badRequest("Some required fields are missing!");
  }

  // TODO: Check the seat patten and seatQtn are valid quantity

  const bus = new Bus({
    name,
    busNumber,
    image,
    price,
    seatImage,
    isAc,
    seatClass,
    seatQtn,
    ownerID,
    seatPatten,
  });

  await bus.save();

  await createSeat({ownerID,busID:bus._id,numberOfSeat:bus.seatQtn});

  return bus._doc;
};

/**
 * This function will return an Array of objecte based on user location and date.
 * @param {string} location
 * @param {string} date
 * @return {Array}
 */

const findAll = async ({ location = "", date }) => {
  const lowerCase = location.toLocaleLowerCase();

  //TODO: Write code for filter based on location and date query

  const bus = await Bus.find();

  return bus;
};

/**
 * This function will return a single bus based on busID.
 * @param {string} id
 * @returns {Object}
 */

const findSingle = async (id) => {
  if (!id) throw badRequest();

  const bus = await Bus.findById(id);

  if (!bus) throw notFound();

  return bus._doc;
};

/**
 * This function will update a hole object if exist. if not exist then it create a new one.
 * @param {String} id
 * @param {*} param1
 * @returns {object}
 */

const updateOrCreate = async (
  id,
  {
    name = "",
    busNumber = "",
    image = "",
    seatImage = [],
    isAc = false,
    price = 1,
    seatClass = "ecnomic",
    seatQtn = 1,
    ownerID,
    seatPatten = "2:2",
  }
) => {
  const bus = await Bus.findById(id);

  if (!bus) {
    const newBus = await create({
      name,
      busNumber,
      image,
      seatImage,
      isAc,
      price,
      seatClass,
      seatQtn,
      ownerID,
      seatPatten,
    });
    return { bus: newBus._doc, status: 201 };
  }

  const payload = {
    name,
    busNumber,
    image,
    seatImage,
    isAc,
    price,
    seatClass,
    seatQtn,
    ownerID,
    seatPatten,
    active: bus.active,
  };

  bus.overwrite(payload);

  await bus.save();
  
  await updateSeatQuantity({ busID: id, seatQuantity: bus.seatQtn });
  return { bus: bus._doc, status: 200 };
};

const updatePropertie = async (
  id,
  {
    name,
    busNumber,
    image,
    seatImage,
    isAc,
    price,
    seatClass,
    seatQtn,
    seatPatten,
  }
) => {
  const bus = await Bus.findById(id);

  if (!bus) throw notFound();

  bus.name = name ?? bus.name;
  bus.isAc = isAc ?? bus.isAc;
  bus.seatQtn = seatQtn ?? bus.seatQtn;
  bus.price = price ?? bus.price;
  bus.seatClass = seatClass ?? bus.seatClass;
  bus.image = image ?? bus.image;
  bus.seatImage = seatImage ?? bus.seatImage;
  bus.busNumber = busNumber ?? bus.busNumber;
  bus.seatPatten = seatPatten ?? bus.seatPatten;

  await bus.save();
  if (seatQtn) {
   
    await updateSeat({ busID: id, seatQuantity: bus.seatQtn });
  }

  return bus._doc;
};

const removeItem = async (id) => {
  const bus = await Bus.findById(id);
  if (!bus) throw notFound();

  await bus.deleteOne()
  await deleteSeat(id);
};

const isValidLocation = async (busId, { from, to }) => {
  const bus = await Bus.findById(busId);

  // const stopes = bus.stopes.map((item) => item.location);

  // return stopes.includes(from) && stopes.includes(to) ? true : false;
};

module.exports = {
  create,
  findAll,
  findSingle,
  updateOrCreate,
  updatePropertie,
  removeItem,
  isValidLocation,
};
