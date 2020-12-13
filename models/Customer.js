const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
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
    }
})

module.exports = Customer = mongoose.model('customer', CustomerSchema)