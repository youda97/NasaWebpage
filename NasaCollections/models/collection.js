const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var uuid = require("uuid");

//User Schema
//Giving users these attributes
const CollectionSchema = mongoose.Schema({
    email: String,
    title: String,
    descrip: String,
    isPublic: Number,
    imageList: [String],
    rating: {
        type: Number,
        default: 0   
    }
    });

const Collection = module.exports = mongoose.model('Collection', CollectionSchema);

module.exports.getCollectionByEmail = function(email, callback){
     //console.log(email);
    const query = {email: email};
    Collection.find(query, callback);
};

module.exports.addCollection = function(newCollection, callback){
    console.log(newCollection);
            newCollection.save(callback);
};
    
