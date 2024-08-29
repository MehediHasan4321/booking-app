const reviewService = require('../../../../libs/review')

const create = async(req,res,next)=>{
    const {message,rating,busID,userID,bookingID} = req.body
    //console.log('review body',req.body)
    try {

        const data = await reviewService.create({message,rating,busID,userID,bookingID})
        
        
        const response = {
            message: 'Review created successfully!!',
            data,
            links:{
                self: `${req.url}/${data._id}`,
                bus: `/api/v1/buses/${data.busID}`
            }
        }

        res.status(201).json(response)
    } catch (e) {
        next(e)
    }
}

module.exports = create