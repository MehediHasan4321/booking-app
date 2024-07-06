const {Bus} = require('../../model')
const {createSeat} = require('./seat')

const { badRequest } = require("../../utils/error")

const create = async({name='bus name',isAc=false,seatPrice=1,seatClass='ecnomic',totalSeat=1,stopes=[],rating=0,ownerId})=>{
    if(!ownerId){
        throw badRequest('Each Bus need to an owner')
    }
    if(stopes.length<2) throw badRequest('Bus stopes must be more then two')
    const bus = new Bus({
        name,
        isAc,
        totalSeat,
        seatClass,
        price:seatPrice,
        ownerId,
        rating,
        stopes
    })

    await bus.save()
    await createSeat({ownerId,busId:bus._id,numberOfSeat:bus.totalSeat})

    return bus._doc


}

module.exports = {
    create
}