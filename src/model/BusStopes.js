const { Schema, model } = require("mongoose");

const BusStopesSchema = new Schema({
    busID:{
        type:String,
        required:true
    },
    date:{
        type: String,
        requuired:true,
    },
    sheft:{
        type:String,
        enum:['Day','Night'],
        default: 'Day'
    },
    stopes:{
        type:[
            {
                location:{
                    type:String,
                    required:true
                },
                time:{
                    type:String,
                    required:true
                },
                start:{
                    type:Boolean,
                    required:true
                },
                finish:{
                    type:Boolean,
                    required:true
                }
            }
        ]
    }
})


const BusStopes = model('BusStopes',BusStopesSchema)

module.exports = BusStopes