const bookingService = require('../../../../libs/booking')

const findAll = async (req,res,next)=>{
    const {sortBy='dsc',sortKey='createdAt',status='pending',search=''} = req.query;

    try {
        const bookings = await bookingService.findAll({sortBy,sortKey,status,search})
        
        const response = {
            code:200,
            message:"Success",
            data:[
                ...bookings
            ],
            links:{
                self:req.url
            }
        }


        res.status(200).json(response)
    } catch (e) {
        next(e)
    }

}

module.exports=findAll