
const authRouter = require("express").Router({ strict: true })
const loginController = require("../controllers/login.controller")
const registrationController = require("../controllers/register.controller")
const resetController = require("../controllers/reset.controller")

authRouter.post("/login", loginController.login)
authRouter.post("/register", registrationController.register)

/* Reset routes */
authRouter.post("/reset", resetController.reset)
authRouter.post("/verify-otp", resetController.verifyOtp)
authRouter.post("/update-password", resetController.updatePassword)

module.exports = { authRouter }