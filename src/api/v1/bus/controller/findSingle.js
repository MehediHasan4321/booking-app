const busService = require('../../../../libs/bus')

const findSingle= async(req,res,next)=>{
    const id = req.params.id

    try {

        const result = await busService.findSingle(id)

        const response = {
            code:200,
            message:'Success',
            data:{
                ...result
            },
            links:{
                self:req.url,
            }
            
        }

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}


module.exports = findSingle