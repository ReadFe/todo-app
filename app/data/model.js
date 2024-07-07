const mongoose = require('mongoose');
const {model} = mongoose;

const dataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    done: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Data', dataSchema)