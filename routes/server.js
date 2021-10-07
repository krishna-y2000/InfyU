const express = require('express');
const router = express.Router();
const connectMongo = require('../model/db');
const productCollection = require('../model/product');
connectMongo();
// GET - Home Page 
router.get('/',(req,res) => {
    res.render("home.ejs");
} )
// POST - Add Product to database 
router.post('/addPost' , async (req,res) => {
    const { item , price , quantity } = req.body ;
    const newProduct = new productCollection( {
        item , 
        price , 
        quantity ,
        totalprice : price * quantity
    } ) ;
    try 
    {
        await newProduct.save();
        console.log('Product Saved');
        return res.redirect('/');
    }

    catch(e)
    {
        console.log(e);
        res.status(500).send({
            message : "Server Error"
        } )
    }
} );
// GET - Get all the products for database 
router.get('/showall',async (req,res) => {
    const products = await productCollection.find();
    res.render('showall.ejs' , { products : products  })
} )
// GET - Edit the item we need bought 
router.get('/edit/:id' , async (req,res) => {
    let productupdate = await productCollection.findById(req.params.id);
    res.render("update.ejs" , {productupdate : productupdate });
})
// POST - Edit the item we need bought
router.post('/editproduct/:id',async (req,res) => {
   
    try 
    {
        await productCollection.findByIdAndUpdate(
            { _id:req.params.id }, 
            { $set: {
            item: req.body.item,
            price: req.body.price,
            quantity: req.body.quantity
         }} ) ;
         console.log("Product Update");
         return res.redirect('/showall');
    }

    catch(e)
    {
        console.log(e);
        res.status(500).send({
            message : "Server Error"
        } )
    }
} )
// GET - Delete the item (Not for testing ) 
router.get('/delete/:id', async(req,res) => {
    await productCollection.deleteOne({_id : req.params.id});
     return res.redirect("/showall");
})

// DELETE - Delete the item (API testing ) 
// router.delete('/delete/:id', async(req,res) => {
//     await productCollection.deleteOne({_id : req.params.id});
//      return res.redirect("/showall");
// })
module.exports = router ;