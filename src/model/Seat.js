const {Schema,model} = require('mongoose')

const SeatSchema = new Schema({
    busId:{
        type: Schema.ObjectId,
        ref:"Bus",
        require: true
    },
    seat:{
        type: [
            {
                name: {
                    type:String,
                    required:true
                },
                isBooked:{
                    type: Boolean,
                    default: false
                },
                booking:{
                    type: [{
                        date: {
                            type: Date,
                            required:true
                        },
                        userId: {
                            type: Schema.ObjectId,
                            ref: "User",
                            required:true
                        }
                    }]
                }
            }
        ] ,
        require: true
    }
},{timestamps:true})

const Seats = model('SeatModel',SeatSchema)

module.exports = Seats