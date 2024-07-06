const {authorizationError} = require('../utils/error')

const roleBasePermission = (role=['admin'])=>(req,res,next)=>{
    const user = req.user
    
    if(role.includes(user.role)){
        return next()
    }

    return next(authorizationError("You don't have the right permission"))
}


module.exports= roleBasePermission