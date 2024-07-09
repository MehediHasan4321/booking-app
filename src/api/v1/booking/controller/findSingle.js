const bookingService = require('../../../../libs/booking')

const findSingle = async (req,res,next)=>{
    const id = req.params.id

    try{
        const booking = await bookingService.findSingle(id)

        const response = {
            code: 200,
            message: 'Success',
            data:{
                booking
            },
            links:{
                self:req.url
            }
        }

        res.status(200).json(response)
    }catch(e){
        next(e)
    }
}

module.exports = findSingle