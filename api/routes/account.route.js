
const accountRouter = require("express").Router({ strict: true })
const profileController = require("../controllers/profile.controller")

accountRouter.get("/me", profileController.me)


module.exports = { accountRouter }