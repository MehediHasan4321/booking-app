const busService = require('../../../../libs/bus')

const findAll =async (req,res,next)=>{
    const {location='',date} = req.query
    
    try {
        const data = await busService.findAll({location,date})
    
        const response = {
            code: 200,
            message:'success',
            data,
            links:{
                self:req.url
            }
        }
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
    
}

module.exports = findAll