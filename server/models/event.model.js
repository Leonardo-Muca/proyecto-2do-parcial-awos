const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let eventSchema = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    annotations: {
        type: String,
    },
    couplesNumber: Number,
    date: {
        type: Date,
        default: Date.now,
    },
    img: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    place: {
        type: String,
        required: [true, 'El lugar es necesario']
    },
    price: Number,
    time: {
        type: Number,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "event"
});

module.exports = mongoose.model('event', eventSchema);