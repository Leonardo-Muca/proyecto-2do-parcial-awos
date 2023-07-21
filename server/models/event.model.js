const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let eventSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del evento es obligatorio']
    },
    number: {
        type: Number,
        required: [true, 'El numero personal es obligatorio']
    },
    refName: {
        type: String,
    },
    typeEvent: {
        type: String,
        required: [true, 'El tipo de evento es obligatorio']
    },
    numberGuess: {
        type: Number,
        required: [true, 'El numero de invitados es obligatorio']
    },
    cost: {
        type: Number,
        required: [true, 'El costo es obligatorio']
    },
    tableNumber: {
        type: Number,
    },
    dateEvent: {
        type: Date,
        required: [true, 'La fecha del evento es obligatorio']
    },
    package: {
        type: String,
    },
    initHour: {
        type: Number,
        required: [true, 'La hora de inicio es obligatorio']
    },
    ticketNumber: {
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