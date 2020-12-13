const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    campaign_name: {
        type: String,
        required: true,
        unique: true
    },
    headline: {
        type: String,
        required: true
    },
    live_date: {
        type: Date,
        default: Date.now
    },
    expiry_date: {
        type: Date,
        default: Date.now
    },
    commision_based: {
        type: Boolean,
        required: true
    },
    commision_value: {
        type: Number,
        required: false
    },
    target_transaction: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

module.exports = Offer = mongoose.model('offer', OfferSchema)