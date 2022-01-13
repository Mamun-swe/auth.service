
const user = require("../../models/user.model")
const { isMongooseId } = require("../middleware/checkId.middleware")

/* My profile */
const me = async (req, res, next) => {
    try {
        const { id } = req.user

        await isMongooseId(id)

        const result = await user.findById(
            id,
            {
                blocked_by: 0,
                blocked_at: 0,
                password: 0
            }
        )

        res.status(200).json({
            status: true,
            data: result
        })
    } catch (error) {
        if (error) next(error)
    }
}

/* Update profile info */
const updateInfo = async(req, res, next) => {
    try {
        
    } catch (error) {
        if(error) next(error)
    }
}

module.exports = {
    me,
    updateInfo
}