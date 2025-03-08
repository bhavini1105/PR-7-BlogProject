const { default: mongoose } = require("mongoose");

const adminSchema =  new mongoose.Schema({
    username : String,
    email : String,
    password:String,
    confirmpassword :String
},{timestamps : true});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin