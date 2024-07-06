const findAll = (req,res,next)=>{
    console.log('I am from findAll');
    res.status(200).json({message:'ok'})
    
}

module.exports = findAll