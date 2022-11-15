//@desc register user
//@route api/users/
//type get
const registerUser = (req, res)=>{
    res.json({message: 'Register user'})
}

//@desc user to login
//@route api/users/login/
//type get
const loginUser = (req, res)=>{
    res.json({message: 'Login user'})
}

//@desc gets all restaurants creates by user
//@route api/users/me
//type get
const getMe = (req, res)=>{
    res.json({message: 'Get user data'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}