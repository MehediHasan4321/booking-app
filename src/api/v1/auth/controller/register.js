const authService = require('../../../../libs/auth')
const {generateToken, verifyToken} = require('../../../../libs/token')

const register = async (req,res,next)=>{
    const {name,email,password} = req.body
    try {

        const user = await authService.register({name,email,password})

        const payload = {
            name: user.name,
            email:user.email,
            _id: user._id,
            role:user.role,
            status:user.status,
        }

       

        const accessToken = generateToken({payload})

        
        const response = {
            code: 201,
            message:'User Created Successfully',
            data:{
               accessToken
            },
            links:{
                self:req.url,
                login:'/auth/login'
            }
        }

        res.status(201).json(response)

    } catch (e) {
        next(e)
    }

}

module.exports= register