const busStopesService = require('../../../../libs/busStopes')

const findSingle = async (req,res,next)=>{
    const busID = req.params.id
    
    
    try{
        const stopes = await busStopesService.findSingle(busID)

        const responses = {
            code: 200,
            message: 'Success',
            data:{
                ...stopes
            },
            links:{
                self: req.url,
                bus:`/buses/${busID}`
            }
        }

        res.status(200).json(responses)

    }catch (e){
        next(e)
    }
}

module.exports = findSingle