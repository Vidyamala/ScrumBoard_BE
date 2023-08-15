const {createTask,getDistinctProject,getPhase,getSprint, getCategory, getTask}=require("../controller/Task");
const { verifyToken } = require("../middleware/Auth.middleware");
module.exports=(app)=>{
    app.post("/task",verifyToken,createTask);
    app.get("/task",verifyToken,getTask);
    app.get("/project",verifyToken,getDistinctProject);
    app.get("/phase",verifyToken,getPhase)
    app.get("/sprint",verifyToken,getSprint)
    app.get("/category",verifyToken,getCategory);

}