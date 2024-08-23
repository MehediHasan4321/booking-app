const {removeBooking} = require('../../../../libs/booking')

const remove = async(req,res,next)=>{
    const id = req.params.id

    try {
        await removeBooking(id)

        res.status(204).json({
            code:204,
            message:'You have delete a booking successfully'
        })
    } catch (e) {
        next(e)
    }
}

module.exports= remove