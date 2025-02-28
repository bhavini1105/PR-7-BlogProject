const { default: mongoose } = require("mongoose");

require('dotenv').config();
const url = process.env.DB_URl

const db = async()=>{
    try {
        await mongoose.connect(url);
        console.log("Database Connected...");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = db;