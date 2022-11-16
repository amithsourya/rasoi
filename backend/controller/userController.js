const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

//@desc register user
//@route api/users/
//type post
const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password)
    {
        res.status(400)
        throw new Error('Please add all fields to register')
    }

    //check if the email is already existing
    const userExists = await User.findOne({email})
    if(userExists)
    {
        res.status(400)
        throw new Error('Email already existing')
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else
    {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc user to login
//@route api/users/login/
//type post
const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password)))
    {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else
    {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc gets all restaurants creates by user
//@route api/users/me
//type get
const getMe = asyncHandler(async(req, res)=>{
    const{_id, email, name} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

//Generate JWT
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}