
const bcrypt = require("bcryptjs")
const User = require("../../models/user.model")
const Validator = require("../validators/auth.validator")

/* Password reset controller */
const Reset = async (req, res, next) => {
    try {
        const { phone } = req.body

        /* Check validity */
        const validate = await Validator.Reset(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        /* find account */
        const is_available = await User.findOne({ phone })
        if (!is_available) {
            return res.status(404).json({
                status: false,
                message: "Account not find."
            })
        }

        res.status(200).json({
            status: false,
            message: "Password will sent your phone number."
        })
    } catch (error) {
        if (error) next(error)
    }
}

/* OTP verify controller */
const Update = async (req, res, next) => {
    try {
        const { phone, otp, new_password } = req.body

        /* Check validity */
        const validate = await Validator.Update(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        /* find matched account with phone & OTP */
        const is_matched = await User.findOne({ $and: [{ phone }, { otp }] })
        if (!is_matched) {
            return res.status(404).json({
                status: false,
                message: "OTP doesn't match."
            })
        }

        /* generate hash password */
        const hash_password = await bcrypt.hash(password, 10)

        /* Update online status */
        const is_update_password = await User.findByIdAndUpdate(is_matched._id, { $set: { password: hash_password } })
        if (!is_update_password) {
            return res.status(500).json({
                status: false,
                message: "Something going wrong."
            })
        }

        res.status(200).json({
            status: true,
            message: "Password updated."
        })
    } catch (error) {
        if (error) next(error)
    }
}

module.exports = {
    Reset,
    Update
}