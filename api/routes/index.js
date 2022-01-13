
const router = require("express").Router()
const { isUser } = require("../middleware/permission.middleware")
const { authRouter } = require("./auth.route")
const { accountRouter } = require("./account.route")

router.use("/auth", authRouter)
router.use("/account", isUser, accountRouter)

module.exports = router