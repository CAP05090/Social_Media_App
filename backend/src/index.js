const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")
const { connection } = require("./configs/db")
const {userRouter} = require("./routes/userRoute")
const { postRouter } = require("./routes/postRoute")

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/users", userRouter)
app.use("/posts", postRouter)

// Swagger Docs
const options = {
    definition:{
        openapi: "3.0.0",
        info:{ title: "Social Media", version: "1.0.0"},
        servers:[{ url:"http://localhost:8088" }]
    },
    apis: ["./src/routes/*js"]
}

//Open API Specs
const openAPIspecs = swaggerjsdoc(options)
// Build Swagger docs 
app.use("/docs", swaggerui.serve, swaggerui.setup(openAPIspecs))

//Home Page
app.get("/", async(req, res)=>{
    res.status(200).send({"msg":"Welcome"})
})


app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`Server is running on port ${PORT} DB is also connected`)
    } catch (error) {
        console.log(error)
    }
})