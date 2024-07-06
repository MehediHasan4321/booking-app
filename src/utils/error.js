const notFound = (mgs='Resourse Not found')=>{
    const error = new Error(mgs)
    error.status=404
    return error
}

const badRequest = (mgs='Bad Request')=>{
    const error = new Error(mgs)
    error.status = 400
    return error
}

const serverError = (mgs='Internal Server Error')=>{
    const error = new Error(mgs)
    error.status=500

    return error
}

const authenticationError = (mgs='Authentication Failed')=>{
    const error = new Error(mgs)
    error.status = 401
    return error
}

const authorizationError = (mgs="You don't have permission")=>{
    const error = new Error(mgs)
    error.status =403

    return error
}

module.exports={
    notFound,
    badRequest,
    serverError,
    authenticationError,
    authorizationError,
}