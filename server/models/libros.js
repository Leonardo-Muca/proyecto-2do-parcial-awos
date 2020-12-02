const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let librosSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es necesario']
    },
    autor: {
        type: String,
        required: [true, 'El autor es necesario'],
    },
    editorial: {
        type: String,
        required: [true, 'La editorial es necesaria']
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Libro', librosSchema);