const busStopesService = require('../../../../libs/busStopes')

const remove = async (req,res,next)=>{
    const id = req.params.id

    try {
        
        await busStopesService.remove(id)
        
        res.status(200).json({message:'Delete successful'})

    } catch (error) {
        next(error)
    }
}

module.exports = remove