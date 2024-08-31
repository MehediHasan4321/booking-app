const busStopesService = require('../../../../libs/busStopes')

const create = async (req,res,next)=>{
    const {date,sheft,stopes,busID}= req.body
    
    
    try {

        const busStopes = await busStopesService.create({busID,date,sheft,stopes})

        const response = {
            message: 'Bus Stopes created successfully',
            data:{
                ...busStopes
            },
            links:{
                self:req.url,
                bus:`/buses/${busID}`
            }
        }

        res.status(201).json(response)
    } catch (e) {
        next(e)
    }
}

module.exports = create