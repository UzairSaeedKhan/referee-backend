const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        default: "123"
    },
    dob: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = Customer = mongoose.model('customer', CustomerSchema)