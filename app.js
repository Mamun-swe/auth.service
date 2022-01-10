const express = require("express")
const cors = require("cors")
const { cpus } = require("os")
const morgan = require("morgan")
const helmet = require("helmet")
const cluster = require("cluster")
const nocache = require("nocache")
const process = require("process")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const compression = require("compression")
const fileUpload = require("express-fileupload")
require("dotenv").config()
const route_v1 = require("./api/routes")

const numCPUs = cpus().length

if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`)

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {
    const app = express()
    app.use(compression())
    app.use(cors())
    app.use(morgan("dev"))
    app.use(fileUpload())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(nocache())
    app.use(helmet())

    /* API routes */
    app.use("/api/auth-service/v1", route_v1)

    app.get('/', (req, res) => {
        res.send("Auth service.")
    })

    app.use((req, res, next) => {
        let error = new Error('404 Page not found')
        error.status = 404
        next(error)
    })

    app.use((error, req, res, next) => {
        if (error.status == 404) {
            return res.status(404).json({
                message: error.message
            })
        }

        if (error.status == 400) {
            return res.status(400).json({
                message: "Bad request"
            })
        }

        if (error.status == 401) {
            return res.status(401).json({
            })
        }

        return res.status(500).json({
            message: "Internal Server Error"
        })
    })

    // DB Connection here
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false
    })
        .then(() => console.log("Database connected"))
        .catch(error => {
            if (error) console.log("Database connection failed")
        })

    // App Port
    const port = process.env.PORT || 4000
    app.listen(port, () => console.log(`App running on ${port} port`))
}
