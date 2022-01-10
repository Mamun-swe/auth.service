const { Schema, model } = require("mongoose")

const validateEmail = function (email) {
    if (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }
    return true
}

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, "Please provide a valid email address"],
        default: null
    },
    phone: {
        type: String,
        trim: true,
        require: true
    },
    gender: {
        type: String,
        trim: true,
        default: null,
        enum: [null, "Male", "Female", "Other"]
    },
    marital_status: {
        type: String,
        trim: true,
        default: null,
        enum: [null, "Single", "Married", "Separated", "Divorced", "Widowed"]
    },
    dob: {
        type: Date,
        trim: true,
        default: null
    },
    present_address: {
        type: String,
        trim: true,
        default: null
    },
    permanent_address: {
        type: String,
        trim: true,
        default: null
    },
    post_code: {
        type: String,
        trim: true,
        default: null
    },
    post_office: {
        type: String,
        trim: true,
        default: null
    },
    upazila: {
        type: String,
        trim: true,
        default: null
    },
    division: {
        type: String,
        trim: true,
        default: null
    },
    country: {
        type: String,
        trim: true,
        default: null
    },
    profile_image: {
        type: String,
        trim: true,
        default: null
    },
    otp: {
        type: Number,
        trim: true,
        default: null
    },
    is_phone_verified: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
    role: {
        type: String,
        trim: true,
        default: "user",
        enum: ["user"]
    },
    is_online: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
    account_status: {
        type: String,
        trim: true,
        default: "active",
        enum: ["active", "blocked"]
    },
    blocked_by: {
        type: Schema.Types.ObjectId,
        default: null
    },
    blocked_at: {
        type: Date,
        default: null
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
}, {
    timestamps: true
})


const user = model("User", userSchema)
module.exports = user
