
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../../models/user.model")
const validator = require("../validators/auth.validator")

/* Regster controller */
const register = async (req, res, next) => {
    try {
        const { name, phone, password } = req.body

        /* Check validity */
        const validate = await validator.register(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        /* match existing account */
        const is_exist_account = await user.findOne({ phone })
        if (is_exist_account) {
            return res.status(408).json({
                status: false,
                message: "Phone number already used."
            })
        }

        /* generate hash password */
        const hash_password = await bcrypt.hash(password, 10)

        const new_user = new User({
            name,
            phone,
            is_online: true,
            password: hash_password
        })

        /* Save new user */
        const save_new_user = await new_user.save()
        if (!save_new_user) {
            return res.status(501).json({
                status: false,
                message: "Something going wrong."
            })
        }

        /* Generate JWT access token */
        const token = await jwt.sign(
            {
                id: save_new_user._id,
                name: save_new_user.name,
                role: save_new_user.role,
            }, process.env.JWT_SECRET, { expiresIn: '1d' }
        )

        return res.status(200).json({
            status: true,
            token
        })
    } catch (error) {
        if (error) next(error)
    }
}


module.exports = { register }