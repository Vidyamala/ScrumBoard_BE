const {createTask,getDistinctProject,getPhase,getSprint}=require("../controller/Task");
const { verifyToken } = require("../middleware/Auth.middleware");
module.exports=(app)=>{
    app.post("/task",verifyToken,createTask);
    app.get("/project",verifyToken,getDistinctProject);
    app.get("/phase",verifyToken,getPhase)
    app.get("/sprint",verifyToken,getSprint)
}