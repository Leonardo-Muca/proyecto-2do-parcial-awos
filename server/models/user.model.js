const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
    },
    lastNameF: {
        type: String,
    },
    lastNameM: {
        type: String,
    },
    age: Number,
    sex: {
        type: String,
        required: false
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "user"
});

module.exports = mongoose.model('user', userSchema);