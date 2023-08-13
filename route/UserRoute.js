const { updateUser } = require("../controller/User")
const { verifyToken } = require("../middleware/Auth.middleware")
const { verifyUpdate } = require("../middleware/verifyUpdate")

module.exports=(app)=>{
    app.put("/projectmanagement/api/v1/user/:id",[verifyToken,verifyUpdate],updateUser)
}
