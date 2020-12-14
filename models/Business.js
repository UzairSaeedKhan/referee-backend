const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BusinessSchema = new Schema({
    title: {
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
        required: true
    },
    designation: {
        type: String,
        required: true,
        default: Date.now
    }
})

module.exports = Business = mongoose.model('business', BusinessSchema)