const busService = require('../../../../libs/bus')
const updateOrCreate = async(req,res,next)=>{
    const id = req.params.id
   
    const {name,isAc=false,stopes=[],totalSeat,seatPrice,seatClass='ecnomic'} = req.body
try {

    const updatedBus = await busService.updateOrCreate(id,{name,isAc,stopes,totalSeat,price:seatPrice,seatClass,owner:req.user})

    const response = {
        code:200,
        message:'Success',
        data:{
            ...updatedBus
        },
        links:{
            self:`/buses/${updatedBus._id}`,
            seat:`/buses/${updatedBus._id}/seats`
        }
    }

    res.status(200).json(response)
}
 catch (e) {
    next(e)
}

}


module.exports=updateOrCreate