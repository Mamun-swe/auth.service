
const jwt = require("jsonwebtoken")

// Check valid JWT
const isValidToken = async (req, res, next) => {
    return { name: "Mamun" }
    // try {
    //     const token = await req.headers.authorization
    //     if (!token) return res.status(404).json({ message: 'Token not found' })

    //     // decode token
    //     const splitToken = await req.headers.authorization.split(' ')[1]
    //     const decode = await jwt.verify(splitToken, process.env.JWT_SECRET)
    //     req.user = decode

    //     next()

    // } catch (error) {
    //     if (error) {
    //         if (error.name === 'TokenExpiredError') {
    //             return res.status(410).json({ message: 'Token expired' })
    //         }
    //         return res.status(501).json({ message: 'Unauthorized request' })
    //     }
    // }
}


module.exports = {
    isValidToken
}