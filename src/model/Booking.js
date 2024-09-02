const { Schema, model } = require("mongoose");

const BookingSchema = new Schema(
  {
    date: {
      type: String,
      require: true,
    },
    time:{
      type: String,
      require: true
    },
    seat: {
      type: String,
      required: true,
      
    },
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    busID: {
      type: String,
      required: true,
      ref: "Bus",
    },
    userID: {
      type: String,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "completed","cancled"],
      default: "pending",
    },
  },
  { timestamps: true }
);


const Booking = model('Booking',BookingSchema)

module.exports = Booking