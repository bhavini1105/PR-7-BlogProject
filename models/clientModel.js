const { default: mongoose } = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: String,
    phone : String,
    email: String
},{timestamps : true});

const Client = mongoose.model('Client',clientSchema);

module.exports = Client;