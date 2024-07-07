const { Bus } = require("../../model");
const { createSeat, updateSeat, deleteSeat } = require("./seat");
const seatService = require("../seat");
const { badRequest, notFound } = require("../../utils/error");

const create = async ({
  name = "bus name",
  isAc = false,
  seatPrice = 1,
  seatClass = "ecnomic",
  totalSeat = 1,
  stopes = [],
  rating = 0,
  ownerId,
}) => {
  if (!ownerId) {
    throw badRequest("Each Bus need to an owner");
  }
  if (stopes.length < 2) throw badRequest("Bus stopes must be more then two");
  const bus = new Bus({
    name,
    isAc,
    totalSeat,
    seatClass,
    price: seatPrice,
    ownerId,
    rating,
    stopes,
  });

  await bus.save();
  await createSeat({ ownerId, busId: bus._id, numberOfSeat: bus.totalSeat });

  return bus._doc;
};

const findAll = async ({ location = "", date }) => {
  const lowerCase = location.toLocaleLowerCase();

  const bus = await Bus.find();
  if (location) {
    const data = bus.filter((entry) =>
      entry.stopes.some((stope) =>
        stope.location.toLocaleLowerCase().startsWith(lowerCase)
      )
    );

    return data;
  }

  return bus;
};

const findSingle = async (id) => {
  if (!id) throw badRequest();

  const bus = await Bus.findById(id);

  if (!bus) throw notFound();
  const seat = await seatService.find(bus._id);
  const result = {
    ...bus._doc,
    seat: seat.seat,
  };

  return result;
};

const updateOrCreate = async (
  id,
  {
    name,
    isAc = false,
    stopes = [],
    totalSeat,
    ownerId,
    price,
    seatClass = "ecnomic",
  }
) => {
  const bus = await Bus.findById(id);

  if (!bus) {
    const newBus = await create({
      name,
      isAc,
      seatPrice,
      seatClass,
      totalSeat,
      ownerId,
      stopes,
    });
    return { bus: newBus._doc, status: 201 };
  }

  const payload = {
    name,
    isAc,
    stopes,
    totalSeat,
    price,
    seatClass,
    ownerId,
  };

  bus.overwrite(payload);

  await bus.save();
  await updateSeat({ busId: id, seatQuantity: bus.totalSeat });
  return { bus: bus._doc, status: 200 };
};

const updatePropertie = async (
  id,
  { name, isAc, stopes, totalSeat, price, seatClass }
) => {
  const bus = await Bus.findById(id);

  if (!bus) throw notFound();

  bus.name = name ?? bus.name;
  bus.isAc = isAc ?? bus.isAc;
  bus.stopes = stopes ?? bus.stopes;
  bus.totalSeat = totalSeat ?? bus.totalSeat;
  bus.price = price ?? bus.price;
  bus.seatClass = seatClass ?? bus.seatClass;

  await bus.save();
  if (totalSeat) {
    await updateSeat({ busId: id, seatQuantity: bus.totalSeat });
  }

  return bus._doc;
};

const removeItem =async (id)=>{
  const bus =await Bus.findById(id)
  if(!bus) throw notFound()

    await bus.deleteOne()
    await deleteSeat(id)
    
}

module.exports = {
  create,
  findAll,
  findSingle,
  updateOrCreate,
  updatePropertie,
  removeItem,
};
