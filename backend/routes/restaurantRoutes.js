const express = require('express')
const router = express.Router()
const{
    getRestaurant,
    postRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require('../controller/restaurantController')

router.route('/').get(getRestaurant).post(postRestaurant)
router.route('/:id').put(updateRestaurant).delete(deleteRestaurant)

module.exports = router