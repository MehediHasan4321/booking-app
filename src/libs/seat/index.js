const {Seats} = require('../../model')

const find = async(busId)=>{
    return await Seats.findOne({busId:busId})

}

module.exports = {
    find
}