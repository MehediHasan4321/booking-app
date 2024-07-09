const { Schema, model } = require("mongoose");

const BookingSchema = new Schema(
  {
    date: {
      type: Date,
      require: true,
    },
    seat: {
      type: String,
      required: true,
      ref: "Seat",
    },
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    busId: {
      type: Schema.ObjectId,
      required: true,
      ref: "Bus",
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);


const Booking = model('Booking',BookingSchema)

module.exports = Booking