const user = require('../model/user');
const jwt = require('jsonwebtoken');



const authUser = (req, res, next) => {
     const token = req.cookies.jwt;

     if(token) {
       const auth = jwt.verify(token, 'Fgizq fsi Xzrrj', (err, decodedToken) => {
        if(err) {
            res.redirect('/');
        } else {
            console.log(decodedToken);
            next();
        }
       })
     } else {
        res.redirect('/');
     } 
}


const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
      const auth = jwt.verify(token, 'Fgizq fsi Xzrrj', async (err, decodedToken) => {
       if(err) {
           console.log(err.message);
           res.locals.us = 'null';
           next();
       } else {
           let use = await user.findById(decodedToken.userId)
           res.locals.us = use;
           console.log(use);
           next();
       }
      })
    } else {
        res.locals.us = 'null';
        next();
    } 
}

module.exports = {authUser, checkUser};