const {Schema,model} = require('mongoose')


const reviewSchama = new Schema({
    message:{
        type: String,
        required: true,
        
    },
    rating:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum:['blocked','published','draft'],
        default: 'published'
    },
    userID:{
        type: String,
        ref: 'User',
        required: true
    },
    busID:{
        type: String,
        ref: 'Bus',
        required: true
    },
    bookingID:{
        type: String,
        ref: 'Booking',
        required: true
    }
},{timestamps:true})

const Review = model('Review',reviewSchama)

module.exports = Review