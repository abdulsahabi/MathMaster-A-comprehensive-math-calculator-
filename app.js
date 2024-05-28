const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router = require('./router/routeHandler');
const cookieParser = require('cookie-parser');
const {authUser, checkUser} = require('./middleware/authUser');


const app = express();
const URI   = 'mongodb+srv://Abdult:test123@cluster0.lenvpu4.mongodb.net/Math?retryWrites=true&w=majority';


// Template engine registration
app.set('view engine', 'ejs');

// // Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public')); 
app.use(cookieParser());

// Connecting to the mongoDB database
mongoose.connect(URI)
.then(res => app.listen(3000, () => console.log("App is listening on port 3000...")))
.catch(err => console.log(err));


app.use('*', checkUser);
app.get('/', (req, res) => {
    res.redirect('/index');
})
app.use(router);

app.use((req, res) => {
    res.json({message: "Page is not found at this moment, try again later..."});
})