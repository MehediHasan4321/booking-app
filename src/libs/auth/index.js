const {generateHashing,compareHash} = require('../../utils/hashing')
const {userExist,createUser, findUserByEmail} = require('../user')
const {badRequest} = require('../../utils/error')
const { generateToken } = require('../token')



const register = async ({name,email,password})=>{
    const hasUser = await userExist(email)

    if(hasUser){
        throw badRequest('User already Exist')
    }

    password = await generateHashing(password)

    

    const user = await createUser({name,email,password})
    return user

}


const login =async ({email,password})=>{
    

    const user = await findUserByEmail(email)

    if(!user){
        throw badRequest('Invalid Credientials')
    }

    const isMatch = await compareHash(password,user.password)

    if(!isMatch){
        throw badRequest('Invalid Credientials')
    }

    const payload = {
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        status:user.status
    }


    return generateToken({payload})


}


module.exports= {
    register,
    login,
}