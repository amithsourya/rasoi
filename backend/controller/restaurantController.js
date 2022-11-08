const asyncHandler = require('express-async-handler') 
const Restaurant = require('../model/restaurantModel')

//@desc Get the details of a restaurant: No need of authentication
//@route api/restaurants/
//type get
const getRestaurant = asyncHandler(async (req, res)=>{
    const restaurants = await Restaurant.find({})

    res.status(200).json(restaurants)
})
//@desc Creates a restaurant: Only by owner; 
//@route api/restaurants/
//type post
const postRestaurant = asyncHandler(async (req, res)=>{
    
    console.log(req.body)
    if(!req.body.name)
    {
        res.status(400)
        throw new Error('Add a text field')
    }
    const restaurant = await Restaurant.create({
        name: req.body.name
    })

    res.status(200).json(restaurant)
})
//@desc Updates the details of a restaurant: Only by owner
//@route api/restaurants/:id
//type put
const updateRestaurant = asyncHandler(async (req, res)=>{
    const restaurant = await Restaurant.findById(req.params.id)
    if(!restaurant)
    {
        res.status(400)
        throw new Error("Restaurant not found")
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedRestaurant)
})
//@desc delete a restaurant: Only by owner
//@route api/restaurants/:id
//type delete
const deleteRestaurant = asyncHandler(async (req, res)=>{
    const restaurant = await Restaurant.findById(req.params.id)
    if(!restaurant)
    {
        res.status(400)
        throw new Error("Restaurant not found")
    }
    restaurant.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getRestaurant,
    postRestaurant,
    updateRestaurant,
    deleteRestaurant
}