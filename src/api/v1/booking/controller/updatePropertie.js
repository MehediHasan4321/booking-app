const bookingService = require('../../../../libs/booking')

const updatePropertie = async(req,res,next)=>{
    const id = req.params.id
    const {date,from,to,seat,status,busId} = req.body
    try {
        const updatedBooking = await bookingService.updatePropertie(id,{date,from,to,seat,status,busId})
        
        const response = {
            code:200,
            message:'Update Success',
            data:{
                ...updatedBooking
            },
            links:{
                self:req.url,
                bus:`/bookings/${updatedBooking._id}/buses`,
                seat:`/bookings/${updatedBooking._id}/seats`
            }
        }
    
        res.status(200).json(response)

    } catch (e) {
        next(e)
    }

}

module.exports = updatePropertie