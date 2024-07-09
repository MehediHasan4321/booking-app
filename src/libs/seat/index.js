const {Seats} = require('../../model')
const { badRequest} = require('../../utils/error')
const {findSeatsByBusId} = require('../bus/seat')

const find = async(busId)=>{
    return await Seats.findOne({busId:busId})

}

const updateSeatPropertie = async(busId,{seat,date})=>{
    const seats = await findSeatsByBusId(busId)
    seats.seat.forEach(item => {
      if(item.name===seat) {

        if(item.booking.includes(date)) throw badRequest('This seat already Booked')

         item.isBooked=true
         item.booking.push(date)

         return item
      }
    });
  
    await seats.updateOne({seat:seats.seat})
    await seats.save()

  }

module.exports = {
    find,
    updateSeatPropertie,
}