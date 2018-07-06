const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let koalaSchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true, unique: true},
    gender: {type: String, required: true},
    age: {type: Number},
    ready_to_transfer: {type: Boolean, required: true},
    notes: {type: String},
});

module.exports = mongoose.model('Koala', koalaSchema);