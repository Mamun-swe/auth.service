
const bcrypt = require("bcryptjs")
const user = require("../../models/user.model")
const validator = require("../validators/auth.validator")

/* Password reset */
const reset = async (req, res, next) => {
    try {
        const { phone } = req.body

        /* Check validity */
        const validate = await validator.reset(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        /* find account */
        const is_available = await user.findOne({ phone })
        if (!is_available) {
            return res.status(404).json({
                status: false,
                message: "Account not found."
            })
        }

        res.status(200).json({
            status: false,
            message: "Check your phone an OTP code send."
        })
    } catch (error) {
        if (error) next(error)
    }
}

/* OTP verify */
const verifyOtp = async (req, res, next) => {
    try {
        const { phone, otp } = req.body

        /* Check validity */
        const validate = await validator.verifyOtp(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        /* find matched account with phone & OTP */
        const is_matched = await user.findOne({ $and: [{ phone }, { otp }] })
        if (!is_matched) {
            return res.status(404).json({
                status: false,
                message: "OTP doesn't match."
            })
        }

        res.status(200).json({
            status: true,
            message: "OTP matched."
        })
    } catch (error) {
        if (error) next(error)
    }
}

/* Update password */
const updatePassword = async (req, res, next) => {
    try {
        const { phone, otp, new_password } = req.body

        /* Check validity */
        const validate = await validator.update(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        /* find matched account with phone & OTP */
        const is_matched = await user.findOne({ $and: [{ phone }, { otp }] })
        if (!is_matched) {
            return res.status(404).json({
                status: false,
                message: "OTP doesn't match."
            })
        }

        /* generate hash password */
        const hash_password = await bcrypt.hash(new_password, 10)

        /* Update online status */
        const is_update_password = await user.findByIdAndUpdate(is_matched._id, { $set: { password: hash_password } })
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
    reset,
    verifyOtp,
    updatePassword
}