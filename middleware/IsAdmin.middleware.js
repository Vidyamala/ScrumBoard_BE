const isAdmin=async (req,res,next)=>{
    const {userType}=req.user;
   
        if(req.user.userType=="ADMIN"){
            next()
        }
        else{
            return res.status(403).send({message:`${req.user.userId} don't have permission to add projects`})
        }
  
}
module.exports={
    isAdmin
}