const { default: mongoose } = require("mongoose");
const TaskSchema=new mongoose.Schema({
    taskName:{
        type:String,
        require:true
    },
    createdBy:{
        type:String,
        require:true
    },
    project:{
        type:String,
        require:true
    },
    phase:{
        type:String,
        require:true
    },
    sprint:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    priority:{
        type:String,
        require:true,
        default:"low"
    },
    acceptanceCriteria:{
        type:String,
        require:true
    },
    assignee:{
        type:String,
        require:true
    },
    estimatedEffort:{
        type:Number,
        require:true
    }
},{
    timeStamp:true
})
module.exports=mongoose.model("Task",TaskSchema);