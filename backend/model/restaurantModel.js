const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, "Please give a name to your Restaurant"]
    },
    latitude: {
        type: Number,
        required: [true, "Please add the latitude"]
    },
    longitude: {
        type: Number,
        required: [true, "Please add the longitude"]
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Restaurant', restaurantSchema)