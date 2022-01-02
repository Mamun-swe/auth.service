
const { isEmpty, isPhone } = require("../helpers")

/* Register validator */
const Register = data => {
    let error = {}

    if (!data.name || isEmpty(data.name)) error.name = "Name is required."
    if (!data.phone || isEmpty(data.phone)) error.phone = "Phone is required."
    if (data.phone && !isPhone(data.phone)) error.phone = "Phone number isn't valid"
    if (!data.password || isEmpty(data.password)) error.password = "Password is required."

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

/* Login validator */
const Login = data => {
    let error = {}

    if (!data.phone || isEmpty(data.phone)) error.phone = "Phone is required."
    if (data.phone && !isPhone(data.phone)) error.phone = "Phone number isn't valid"
    if (!data.password || isEmpty(data.password)) error.password = "Password is required."

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

/* Reset */
const Reset = data => {
    let error = {}

    if (!data.phone || isEmpty(data.phone)) error.phone = "Phone is required."
    if (data.phone && !isPhone(data.phone)) error.phone = "Phone number isn't valid"

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

/* Update password */
const Update = data => {
    let error = {}

    if (!data.phone || isEmpty(data.phone)) error.phone = "Phone is required."
    if (data.phone && !isPhone(data.phone)) error.phone = "Phone number isn't valid"
    if (!data.otp || isEmpty(data.otp)) error.otp = "OTP is required."
    if (!data.new_password || isEmpty(data.new_password)) error.new_password = "New password is required."

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}


module.exports = {
    Login,
    Register,
    Reset,
    Update
}