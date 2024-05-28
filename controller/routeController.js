const user = require('../model/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    const payload = {userId: id}
    return jwt.sign(payload, 'Fgizq fsi Xzrrj', {expiresIn: 60 * 60 * 24 * 3});
}

const handleUniqueError = (err) => {
    let uniqueErrors = {
        matric_no: '',
        email: '',
        signed_token: ''
    };

    if(err.code === 11000){
        if(err.keyPattern.matric_no === 1) {
            uniqueErrors['matric_no'] = "This matric number is in use";
        }
        if(err.keyPattern.email === 1) {
            uniqueErrors['email'] = 'This email is in use';
        }  
    }

    return uniqueErrors;
}

module.exports.index_get = (req, res) => {
    res.render('index')
} 

module.exports.signup_get = (req, res) => {
   res.render('sign_up');
} 

module.exports.login_get = (req, res) => {
  res.render('login');  
} 

module.exports.calculator = (req, res) => {
    res.render('calculator');
} 

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.json({logout: '/'});
}
    

module.exports.signup_post = async (req, res) => {
    const userObject = req.body;
    try {
     const createdUser = await user.create(userObject);
     const token = createToken(createdUser._id);
     res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 3});
     res.json({user: createdUser});
     console.log(createdUser)
    } catch(err) {
     const errors = handleUniqueError(err);
     res.json({error: errors});
     console.log(errors);
    }
} 


module.exports.login_post = async (req, res) => {
    const {matric_no, password} = req.body;
    console.log(matric_no, password);
    try {
    const loginUser = await user.login(matric_no, password);
    console.log(loginUser)
    const token = createToken(loginUser._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 3});
    res.status(201).json({user: loginUser._id});
    } catch(err) {
        res.json({incorrect: err.message});
        console.log(err.message)
    }
} 