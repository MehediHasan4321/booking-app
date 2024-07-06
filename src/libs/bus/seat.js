const { generateSeat } = require("./utils")
const {Seats} = require('../../model')

const createSeat = async({ownerId,busId,numberOfSeat=1})=>{
    const busSeats = generateSeat(numberOfSeat)
    const seat = new Seats({
        busId,
        ownerId,
        seat:busSeats
    })

    await seat.save()



}
module.exports= {createSeat}