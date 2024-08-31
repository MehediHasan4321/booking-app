const { Schema, model } = require("mongoose");


const BusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    busNumber:{
      type:String,
      required: true
    },
    image:{
      type: String,
      required: true
      
    },
    seatImage:{
      type:[{}],
      required:false
    },
    ownerID: {
      type: String,
      ref: "User",
      required: true,
    },
    stopesID:{
      type: String,
      ref: "BusStopes"
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
    seatPatten:{
      type:String,
      required: false
    },
    seatQtn: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    active:{
      type:Boolean,
      required:true,
      default:false
    }
   
  },
  { timestamps: true }
);

const Bus = model("Bus", BusSchema);

module.exports = Bus;
