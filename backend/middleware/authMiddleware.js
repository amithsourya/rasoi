const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async(req, res, next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try{
            token = req.headers.authorization.split(' ')[1]

            //verify token and get decoded one
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token and assign it to request so that others can access it
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }
        catch(error)
        {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    } 
    if(!token)
    {
        res.status(401)
        throw new Error('Not Authorized, No token')
    }
})

module.exports = {protect}