const router = require('express').Router();
const Cart = require('../modules/cart');
const Order = require('../modules/order');
const Products = require('../modules/products');
const user = require('../modules/user');
const products = require('../modules/products');
const { verifyToken, tokenandAdminVerification, tokenandAuthorVerification } = require('./verifyToken');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
//GET total order count
router.get("/totalorders",async(req,res)=>{
    //console.log(req.query);
    try {
        const getData = await Order.aggregate([
            {
              $group: {
                _id: { $month: "$createdAt" }, // Grouping by month
                count: { $sum: 1 } // Counting the documents in each group
              }
            }
            
          ]);
        res.status(200).json(getData);
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});
router.get("/totalusers",async(req,res)=>{
    //console.log(req.query);
    try {
        const getData = await user.aggregate([
            {
              $group: {
                _id: { $month: "$createdAt" }, // Grouping by month
                count: { $sum: 1 } // Counting the documents in each group
              }
            }
            
          ]);
        res.status(200).json(getData);
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});

module.exports = router;