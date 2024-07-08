const userService = require('../../../../libs/user')
const findAll = async(req,res,next)=>{
    const {sortBy,sortType,role,status,search} = req.query

    try {
        const user = await userService.findAll({sortBy,sortType,role,status,search})

        const response = {
            code:200,
            message:'Success',
            data:user,
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