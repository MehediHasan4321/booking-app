const busServices = require('../../../../libs/bus')

const {generateSeat} = require('../../../../libs/bus/utils')

const create =async (req,res,next)=>{
    const {name='bus name',isAc=false,seatPrice=1,seatClass='ecnomic',totalSeat=1,stopes=[]} = req.body

    try {
        const bus = await busServices.create({
            name,
            isAc,
            seatClass,
            seatPrice,
            totalSeat,
            stopes,
            ownerId:req.user._id
        })
    
        const responses = {
            code: 201,
            message: 'Bus created Successful',
            data:{
                bus,
            },
            links:{
                self:`/buses/${bus._id}`,
                seat:`/buses/${bus._id}/seats`
            }
        }
    
        res.status(201).json(responses)
    } catch (e) {
        next(e)
    }
}

module.exports=create