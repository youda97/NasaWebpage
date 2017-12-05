const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const port = 8081;
const app = express();
const users = require('./routes/users');
const config = require("./config/database");

//COnnected to database
mongoose.connect(config.database);

//On connection 
mongoose.connection.on('connected', () => {
    console.log("Connected to db " + config.database);
});

//On db error
mongoose.connection.on('error', (err) => {
    console.log("Database " + err);
});

//CORS Middleware
app.use(cors());

//BodyParser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//Reroute to users
app.use('/users', users);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Index Route
app.get('/', (req, res) => {
   res.send('Invalid Endpoint'); 
});

//Start server
app.listen(port, () =>{
    console.log('Server started on port ' + port);
});



























// // BASE SETUP
// // =============================================================================
// var mongoose   = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/nasa',{useMongoClient : true });
// var Account = require('./models/account');

// // const passport = require('passport');
// // const jwt = require('jsonwebtoken');
// // const config = require('../../config/database');

// // call the packages we need
// var express    = require('express');        // call express
// var app        = express();                 // define our app using express
// var bodyParser = require('body-parser');

// // configure app to use bodyParser()
// // this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// var port = 8081;        // set our port

// // // ROUTES FOR OUR API
// // // =============================================================================
// var router = express.Router();

// //REGISTER
// router.post('/register',(req,res,next)=>{
//     let account = new Account({
//         //name: req.body.name,
//         email: req.body.email,
//         //username: req.body.username,
//         password: req.body.password
//     });
   
//     // Check if a user with that email is already registered
//     Account.getUserByEmail(account.email, (error, user)=>{
//         // Throw error if any
//         if(error) throw error;
 
//         // email not found
//         if(!user){
//             Account.addUser(account, (err, user)=>{
//                 if(err){
//                     res.json({
//                         success: false,
//                         message: 'Failed to register user'
//                     });
//                 }
//                 else{
//                     res.json({
//                         success: true,
//                         message: 'User successfully registered'
//                     });
//                 }
//             });
//         }
//         // email is found - user already exists
//         else{
//             console.log('This email already exists');
//             res.json({
//                     success: false,
//                     message: 'Email already in use'
//                 });
//         }
//     });
// });
 
// module.exports = router;
// app.use("/api",router);
// app.listen(port);
// console.log("Magic happens on port "+port);

// // // server.js

// // // BASE SETUP
// // // =============================================================================
// // const express = require('express');
// // var mongoose   = require('mongoose');
// // mongoose.connect('mongodb://localhost:27017/nasa',{useMongoClient : true });
// // const Account = require('./models/account');

// // const router = express.Router();
// // const passport = require('passport');
// // const jwt = require('jsonwebtoken');
// // // const config = require('../../config/database');

// // // call the packages we need
// // var app        = express();                 // define our app using express
// // var bodyParser = require('body-parser');

// // // configure app to use bodyParser()
// // // this will let us get the data from a POST
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());

// // var port = 8081;        // set our port

// // // ROUTES FOR OUR API
// // // =============================================================================
// // router.post('/register',(req,res,next)=>{
// //     let newUser = new Account({
// //         //name: req.body.name,
// //         email: req.body.email,
// //         //username: req.body.username,
// //         password: req.body.password
// //     });
    

// // // REGISTER OUR ROUTES -------------------------------
// // // all of our routes will be prefixed with /api
// // app.use('/api', router);

// // // START THE SERVER
// // // =============================================================================
// // app.listen(port);
