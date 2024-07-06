const { Schema, model } = require("mongoose");

const BusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    isAc: {
      type: Boolean,
      default: false,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seatClass: {
      type: String,
      enum: ["ecnomic", "business", "first class"],
      default: "ecnomic",
    },
    totalSeat: {
      type: Number,
      required: true,
    },
    rating: {
      type: String,
      default: 0,
    },
    stopes: {
      type: [
        {
          location: {
            type: String,
            required: true,
          },
          time: {
            type: Date,
            required: true,
          },
          isStartingPoint: {
            type: Boolean,
            default: false,
          },
          isEndPoint: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const Bus = model("Bus", BusSchema);

module.exports = Bus;
