const userService = require('../../../../libs/user')

const updatePropertie = async (req,res,next)=>{
    const id = req.params.id

    try {
        const user = await userService.updatePropertie(id,{...req.body})

        const response = {
            code:200,
            message:'Success',
            data:{
                ...user
            },
            links:{
                self:req.url
            }
        }


        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
    
}


module.exports= updatePropertie