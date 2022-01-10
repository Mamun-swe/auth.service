
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../../models/user.model")
const validator = require("../validators/auth.validator")

/* Login controller */
const login = async (req, res, next) => {
    try {
        const { phone, password } = req.body

        /* Check validity */
        const validate = await validator.login(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        /* Account find using phone */
        const account = await user.findOne({ phone })
        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Invalid phone or password."
            })
        }

        /* Check blocked status */
        if (account.account_status === "blocked") {
            return res.status(422).json({
                status: false,
                message: "Your account has been blocked from admin."
            })
        }

        /* Compare with password */
        const result = await bcrypt.compare(password, account.password)
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Invalid phone or password."
            })
        }

        /* Generate JWT token */
        const token = await jwt.sign(
            {
                id: account._id,
                name: account.name,
                role: account.role,
            }, process.env.JWT_SECRET, { expiresIn: '1d' }
        )

        /* Update online status */
        const is_update_online = await user.findByIdAndUpdate(account._id, { $set: { is_online: true } })
        if (!is_update_online) {
            return res.status(500).json({
                status: false,
                message: "Something going wrong."
            })
        }

        return res.status(200).json({
            status: true,
            token
        })
    } catch (error) {
        if (error) next(error)
    }
}


module.exports = { login }