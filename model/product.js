const mongoose = require('mongoose');
// Creating Collection 
const productCollection = new mongoose.Schema({
    item : {
        type : String 
    } ,
    price : {
        type : Number ,
        
    }, 
    quantity : {
        type : Number ,  
    },
    totalprice : {
        type : Number ,  
    }
} )

module.exports = mongoose.model('productCollection' , productCollection);