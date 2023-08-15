const { default: mongoose } = require("mongoose");
const { userStatus, userType } = require("../utils/constants");
const validator = require("validator");
const userSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        minLength:5,
        maxLength:10,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:validator.isEmail
        }
    },
    status:{
        type:String,
        default:userStatus.pending
    },
    userType:{
        type:String,
        required:true,
        default:userType.engineer
    },
    project:[
        {
            type:String,
            required:true
        },
    ]
},{
    timeStamp:true
})
module.exports=mongoose.model("user",userSchema);