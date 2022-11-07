const asyncHandler = require('express-async-handler') 
//@desc Get the details of a restaurant: No need of authentication
//@route api/restaurants/
//type get
const getRestaurant = asyncHandler(async (req, res)=>{
    res.status(200).json({message: "Get restaurants"})
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
    else
    {
        res.status(200).json({message: "Created restaurant"})
    }
})
//@desc Updates the details of a restaurant: Only by owner
//@route api/restaurants/:id
//type put
const updateRestaurant = asyncHandler(async (req, res)=>{
    res.status(200).json({message: `Updated restaurant ${req.params.id}`})
})
//@desc delete a restaurant: Only by owner
//@route api/restaurants/:id
//type delete
const deleteRestaurant = asyncHandler(async (req, res)=>{
    res.status(200).json({message: `Deleted restaurant ${req.params.id}`})
})

module.exports = {
    getRestaurant,
    postRestaurant,
    updateRestaurant,
    deleteRestaurant
}