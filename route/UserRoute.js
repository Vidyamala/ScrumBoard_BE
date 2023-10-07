const { updateUser, addProject, getUserById, getAllUserId } = require("../controller/User")
const { verifyToken } = require("../middleware/Auth.middleware");
const { isAdmin } = require("../middleware/IsAdmin.middleware");
const { verifyUpdate } = require("../middleware/verifyUpdate")

module.exports=(app)=>{
    app.put("/projectmanagement/api/v1/user/:id",[verifyToken,verifyUpdate],updateUser);
    app.put("/projectmanagement/api/v1/project/:id",[verifyToken,isAdmin],addProject);
    app.get("/projectmanagement/api/v1/user/:id",[verifyToken],getUserById)
    app.get("/projectmanagement/api/v1/user",[verifyToken,isAdmin],getAllUserId)
}
