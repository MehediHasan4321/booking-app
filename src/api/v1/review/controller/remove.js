const reviewService = require("../../../../libs/review");


const remove = async (req,res,next)=>{
    const reviewID = req.params.id

    try{
        await reviewService.remove(reviewID)

        const response = {
            message: 'Review remove successfully',
            links:{
                self:req.url,
                bus: `/`
            }
        }

        res.status(200).json(response)

    }catch(e){
        next(e)
    }
}


module.exports = remove