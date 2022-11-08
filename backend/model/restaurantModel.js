const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please give a name to your Restaurant"]
    },
    },
    {
        timestamps: true,
    })

module.exports = mongoose.model('Restaurant', restaurantSchema)