const verifyUpdate=async (req,res,next)=>{
    const {approve}=req.query;
    if(approve){
        if(req.user.userType=="ADMIN"){
            next()
        }
        else{
            return res.status(403).send({message:`${req.user.userId} don't have permission to approve the user`})
        }
    }
    else{
        next()
    }
}
module.exports={
    verifyUpdate
}