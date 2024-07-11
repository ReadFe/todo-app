const mongoose = require('mongoose');
const {model} = mongoose;

const dataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: [30, 'Panjang maksimal hanya 30 karakter']
    },

    done: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Data', dataSchema)