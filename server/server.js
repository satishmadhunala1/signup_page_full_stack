const express = require("express")
const app = express()
require("dotenv").config()
const bodyparser = require("body-parser")
const cors = require ('cors')
const Authrouter = require("./routes/AuthRouter")
const PORT = process.env.PORT || 5000

const connectDb = require("./models/db")

// Enable CORS for all routes
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.CLIENT_URL 
        : 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// API routes
app.use("/api/auth", Authrouter)

app.get("/api/test", (req,res) => {
    res.json({ message: "API is working" })
})

// Connect to database
connectDb();

// Only start the server if we're not in a Vercel environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

// Export the app for Vercel
module.exports = app
