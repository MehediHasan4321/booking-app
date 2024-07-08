const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password:{
      type: String,
      required:true
    },
    phone:{
      type:Number,
      required:false
    },
    avater:{
      type:String,
      required:false
    },
    role: {
      type: String,
      enum: ["user", "owner", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "blocked"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

module.exports=User
