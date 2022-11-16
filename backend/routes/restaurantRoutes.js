const express = require('express')
const router = express.Router()
const{
    getRestaurant,
    postRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require('../controller/restaurantController')
const {protect} = require('../middleware/authMiddleware')

//protect only for post, update and delete
//get by anyone, so anyone can view
router.route('/').get(protect, getRestaurant).post(protect, postRestaurant)
router.route('/:id').put(protect, updateRestaurant).delete(protect, deleteRestaurant)

module.exports = router