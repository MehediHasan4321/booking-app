const bcrypt = require('bcryptjs')

const generateHashing = async (raw,saltRound=10)=>{
    const salt = await bcrypt.genSalt(saltRound)

    
    return bcrypt.hash(raw,salt)
    
}

const compareHash = async (raw,hash)=>{
    const result = await bcrypt.compare(raw,hash)

    return result
}

module.exports = {
    generateHashing,
    compareHash,
}