const authServeice = require('../../../../libs/auth')

const login = async (req,res,next)=>{
    
    const {email,password} = req.body

    
  
    try {
        const accessToken = await authServeice.login({email,password})
        const response = {
            code: 200,
            message:'',
            data:{
                accessToken
            },
            links:{
                self:req.url
            }
        }

        res.status(200).json(response)
    } catch (e) {
        next()
    }

}

module.exports = login