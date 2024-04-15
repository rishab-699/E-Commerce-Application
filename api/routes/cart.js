const router = require('express').Router();
const Cart = require('../modules/cart');
const products = require('../modules/products');
const { verifyToken, tokenandAdminVerification, tokenandAuthorVerification } = require('./verifyToken');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;


//Add Product

router.post("/add/:id", tokenandAuthorVerification, async(req,res)=>{
    //console.log(req.body);
    try {
        const newCart = new Cart(
            req.body
        )
        const save = await newCart.save();
        res.status(200).json(save);
    } catch (error) {
        //console.log(error)
        res.status(500).json('Internal Server Error')
    }
});

// update

router.put("/:id", tokenandAuthorVerification, async(req,res)=>{
    try {
        
        const update = await Cart.updateOne({'userId':req.params.id},{
            $push: { products: req.body.products }
        },{new:true});
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});

//DELETE
router.delete("/:id", tokenandAuthorVerification, async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('Product Deleted Successfully');
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});
router.post("/CartProduct", async (req, res) => {
    try {
        //console.log(req.body)
        const update = await Cart.updateOne(
            {_id: req.body.orderId },
            { $pull: { 'products': { 'productId': req.body.productId } } },
            { new: true }
        );
        if (update.modifiedCount === 1) {
            //console.log("Product removed successfully");
            res.status(200).json(update);
        } else {
            //console.log("Product not found or not removed");
            res.status(404).json({ error: "Product not found or not removed" });
        }
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json('Internal server Error');
    }
});

//GET user Cart by ID
router.get("/find/:id",async(req,res)=>{
    //console.log(req.params);
    try {
        const getData = await Cart.findOne({userId: req.params.id});
        res.status(200).json(getData);
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});
router.post("/findProducts",async(req,res)=>{
    try {
        let getData = [];
        if (typeof req.body === 'object' && Object.values(req.body).some(Array.isArray)) {
          // Create an array to store all promises
          const promises = [];
      
          Object.values(req.body).forEach(data => {
            // Check if each data is an array
            if (Array.isArray(data)) {
              // Flatten the array of arrays into a single array of ObjectIds as strings
              const flatIds = data.reduce((acc, val) => acc.concat(val), []);
            
              // Convert each string ObjectId to ObjectId
              const ids = flatIds.map(id => new ObjectId(id));
              
            
              // Push each asynchronous operation (products.find()) into the promises array
              promises.push(products.find({ _id: { $in: ids } }));
            }
          });
      
          // Wait for all promises to resolve using Promise.all()
          const results = await Promise.all(promises);
          
          // Concatenate all results into a single array
          getData = getData.concat(results.flat());
        } else {
          // If req.body is not an object containing arrays, directly find products
          getData = await products.find({ _id: { $in: req.body.ids } });
        }
      
        res.status(200).json(getData);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "An error occurred while fetching data." });
      }
});
//GET all product
router.get("/",tokenandAdminVerification,async(req,res)=>{
        try {
            const carts = await Cart.find();
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json('Internal server Error');
        }
});

module.exports = router;