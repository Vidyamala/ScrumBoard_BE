const { default: mongoose } = require("mongoose");
const { userStatus, userType } = require("../utils/constants");

const userSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        minLength:5,
        maxLength:10,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        default:userStatus.pending
    },
    userType:{
        type:String,
        required:true,
        default:userType.engineer
    }
},{
    timeStamp:true
})
module.exports=mongoose.model("user",userSchema);