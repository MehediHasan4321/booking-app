const userService = require('../../../../libs/user')
const findSingle=async (req,res,next)=>{
    const id = req.params.id
    try {
        const user = await userService.findSingle(id)
        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
}

module.exports= findSingle