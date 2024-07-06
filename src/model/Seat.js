const {Schema,model} = require('mongoose')

const SeatSchema = new Schema({
    busId:{
        type: Schema.ObjectId,
        ref:"Bus",
        require: true
    },
    ownerId:{
        type:Schema.ObjectId,
        ref:'User',
        required:true
    },
    seat:{
        type:[{}],
        required:true
    }
},{timestamps:true})

const Seats = model('Seats',SeatSchema)

module.exports = Seats