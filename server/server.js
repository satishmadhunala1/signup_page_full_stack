const express = require("express")
const app = express()
require("dotenv").config()
const bodyparser = require("body-parser")
const cors = require ('cors')
const Authrouter = require("./routes/AuthRouter")
PORT = process.env.PORT

const connectDb = require("./models/db")

app.get("/test",(req,res)=>{
    res.send("testing node server")
})

app.use(express.json())
app.use(cors())
app.use("/auth", Authrouter)

connectDb();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
