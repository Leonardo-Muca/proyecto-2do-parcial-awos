const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name:{
        type:String,
        required: [true,'El nombre es necesario']
    },
    lastNameF:{
        type:String,
    },
    lastNameM:{
        type:String,
    },
    age: Number,
    number: Number,
    height: Number,
    img:{
        type:String,
        required:false
    },
    sex:{
        type:String,
        required:false
    },
    experience:{
        type: String,
        require: false
    },
    disease:{
        type: String,
        require: false
    },
    active:{
        type: Boolean,
        default: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "user"
});

module.exports = mongoose.model('user',userSchema);