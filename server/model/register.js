const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    term: { type: Boolean, required: true },
    admin:{type:Boolean,default:false}


})

module.exports = mongoose.model("user", userSchema)