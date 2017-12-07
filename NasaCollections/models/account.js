var mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const config = require('../config/database');
const uuid = require('uuid');
const Token = require("token");

'use strict';
const nodemailer = require('nodemailer');
const xoauth2 = require("xoauth2");

//User schema
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    __v: {
        type: Number
    },
    usertoken: {
        type: String
    },
    isAdmin: {
        type: Number
    }, 
    sec: {
        type: String
    },
    theDMCA: {
        type: String
    },
    pri: {
       type: String 
    }
});

const User = module.exports = mongoose.model('User', AccountSchema);

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query, callback);
}

module.exports.getUserByToken = function(token){
    const query = {usertoken: token};
    User.findOne(query);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            console.log("ERROR");
        }
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err){
                throw err;
            } 
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err){
            throw err;
        }
        callback(null, isMatch);
    });
}

//-------------------------------------------Mail Config---------------------------------------
var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // xoauth2: xoauth2.createXOAuth2Generator({
            type: 'OAuth2',
            user: 'oudayousef3@gmail.com',
            clientId: '248775388600-v84ujnknbte9h4br4b2qbbvc51tut62t.apps.googleusercontent.com',
            clientSecret: 't0Jc7tS63s7f_bVUpfQNINYl',
            refreshToken: '1/RL_otpK4BK_vZ7QGvJgxuuTst9w3nFG-5F1V_GFzow2ZquJ3j2LPHwKiJpxEdozz'
        // }) 
    }
});

module.exports.sendEmail = function(user, verificationTokenData){
    var verificationUrl = "https://youda-lab5-youda97.c9users.io:8081/users/verify/" + verificationTokenData;
    var emailBody = '<p>Hey, <br/>Verify your email by clicking the following link: <a href="' + 
        verificationUrl + '" target="_blank"> Click me</a></p>';
    
    var mailOptions = {
        from: 'Yousef <oudayousef3@gmail.com>',
        to: user.email,
        subject: 'Nasa PCollections',
        html: emailBody
    }
    
    transport.sendMail(mailOptions, (err, res) => {
        if(err){
            console.log(err); return false;
        } else {
            console.log("Email sent"); return true;
        }
    }); 
}
