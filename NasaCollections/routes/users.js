const express = require('express');
const router = express.Router();
const User = require("../models/account");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const eVer = require("../email-verification");
const Collection = require("../models/collection");


//Register
router.post('/register', (req, res) =>{
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        __v: req.body.__v,
        usertoken: req.body.usertoken
    });
    
    // Check if a user with that email is already registered
    User.getUserByEmail(newUser.email, (error, user)=>{
        if(error){
            throw error;
        } 
        
        if(user){
              return res.json({
                    success: false,
                    msg: "User already registered!"
            });
        } else{
            User.addUser(newUser, (err, user) =>{
                if(err){
                    res.json({
                        success: false,
                        msg: "Failed to register user"
                    });
                } else{
                    res.json({
                    success: true,
                    msg: "User Registered"
                    });
                    // console.log(user);
                    if(user.email == "mdawoud2@uwo.ca"){
                        user.__v = 0;
                        // user.isAdmin = 1;
                        console.log("ADMIN REGISTERED");
                        console.log(user);
                        eVer.verifyUser(newUser);
                    } else{
                        user.__v = 0;
                        eVer.verifyUser(newUser);   
                    }
                }    
            });
        } 
    });
});

//Authenticate
router.post('/authenticate', (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    
    User.getUserByEmail(email, (err, user) =>{
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success: false, msg: "User not found"});
        } 
        
        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err){
                throw err;
            }
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week 
                });
                console.log(user);
                res.json({
                   success: true,
                   token: 'JWT ' + token,
                   user: {
                       email: user.email,
                      __v: user.__v,
                      user: user.usertoken
                   }
                });
                
            }
            else{
                return res.json({success: false, msg: "Wrong password"});
            }
            
        });
    });
});

// //-----------------------Verification-------------------------------------
router.post('/re-verification-email', function(req, res) {
    var newUser = {
        // _id: req.body._id,
        email: req.body.email,
        passport: req.body.password
        // usertoken: req.body.usertoken
    };
    eVer.reVerifyUser(newUser);
	res.send({success: true, msg: "You're verification email has been sent"});
});

//Verification
router.get('/verify/:verificationToken', function(req, res) {
    var tokenData = req.params.verificationToken;
		eVer.confirmToken(tokenData, function(err) {
			if (err) {
				res.json({
				    success: false,
					error: 'Error verifying email.',
				});
			} else {
				res.json({
					success: true, 
					message: 'Youre account is now verified'
				});
			}
		});
});

//----------------------------------------Profile-------------------------------------------------------
//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}),(req, res) =>{
    res.json({user: req.user});
});

//------------------------------------------Collection-----------------------------------------------------

router.post('/collection',(req,res,next)=>{
	console.log(Object.keys(req.body));
	let newCollection = new Collection({
		email: req.body.email,
	  title: req.body.title,
	  descrip: req.body.descrip,
	  isPublic: req.body.isPublic,
	  imageList: req.body.imageList
	});
    
		
		console.log('New collection from user with email '+newCollection.email);
			Collection.addCollection(newCollection, (err, user)=>{
				if(err){
					res.json({
						success: false,
						message: 'Failed to create collection'
					});
				}
				else{
					res.json({
						success: true,
						message: 'Collection successfully created'
					});
				}
			});

});

//Get a users collection 
router.get('/collections/usercollections/:email', passport.authenticate('jwt', {session:false}),(req,res,next)=>{
	let newCollection = new User({
		email: req.params.email,
	});
	console.log('1');
	// console.log(Collection.getCollectionByEmail(newCollection.email));
		console.log('2');

	Collection.getCollectionByEmail(newCollection.email, (error, cn)=>{
		if(error){
			console.log("erooooooooooooooooooooooooooooooooooooooooooooooooooooooooooor");
			throw error;
		} 

		// console.log('looking for collections from '+newCollection.email);
		// // email not found
		if(cn){
			res.json({collection: cn});
		} else {
			res.json({
				success: false
			});
		}

    
});
});

//-----------------------------------Admin--------------------------------------------------------------------------------
//Register
router.post('/register', (req, res) =>{
    // Check if a user with that email is already registered
    User.getUserByEmail(req.body.email, (error, user)=>{
        if(error){
            throw error;
        } 
        
        if(user){
              return res.json({
                    success: false,
                    msg: "User already registered!"
            });
        } else{
            User.addUser(newUser, (err, user) =>{
                if(err){
                    res.json({
                        success: false,
                        msg: "Failed to register user"
                    });
                } else{
                    res.json({
                    success: true,
                    msg: "User Registered"
                    });
                    // console.log(user);
                    if(user.email == "mdawoud2@uwo.ca"){
                        user.__v = 0;
                        // user.isAdmin = 1;
                        console.log("ADMIN REGISTERED");
                        console.log(user);
                        eVer.verifyUser(newUser);
                    } else{
                        user.__v = 0;
                        eVer.verifyUser(newUser);   
                    }
                }    
            });
        } 
    });
});
module.exports = router;