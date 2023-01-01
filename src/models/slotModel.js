const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    date : {
        type : Date,
        required
    }

})
module.exports = mongoose.model('Slot', slotSchema)