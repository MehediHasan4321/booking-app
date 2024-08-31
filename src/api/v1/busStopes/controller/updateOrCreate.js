const busStopesService = require('../../../../libs/busStopes')

const updateOrCreate = async (req,res,next)=>{
    const id = req.params.id
    const { date,busID,sheft,stopes} = req.body
    
    
    try {
        
        const {busStopes,code} = await busStopesService.updateOrCreate(id,{date,busID,sheft,stopes})

        const responses = {
            code,
            message: code===201?'Stopes created successfully':'Bus Stopes updated successfully',
            data:{
                ...busStopes
            },
            links:{
                self:req.url,
                bus:`/buses/${busID}`
            }
        }

        res.status(code).json(responses)


    } catch (e) {
        next(e)
    }
}

module.exports = updateOrCreate