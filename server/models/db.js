const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL


const connectDb = async ()=>{
    try{
        await mongoose.connect(MONGO_URL)
        console.log("Connected to database")
    }

    catch{

        res.send("Error connecting to database")

    }
}

module.exports = connectDb;
