const express = require('express');
const router = express.Router();
const connectMongo = require('../model/db');
const productCollection = require('../model/product');
connectMongo();
router.get('/',(req,res) => {
    res.render("home.ejs");
} )
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
router.get('/showall',async (req,res) => {
    const products = await productCollection.find();
    res.render('showall.ejs' , { products : products  })
} )

router.get('/edit/:id' , async (req,res) => {
    let productupdate = await productCollection.findById(req.params.id);
    res.render("update.ejs" , {productupdate : productupdate });
})
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

router.get('/delete/:id', async(req,res) => {
    await productCollection.deleteOne({_id : req.params.id});
     return res.redirect("/showall");
})
module.exports = router ;