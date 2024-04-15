const router = require('express').Router();
const Order = require('../modules/order');
const { verifyToken, tokenandAdminVerification, tokenandAuthorVerification } = require('./verifyToken');

//Add Product

router.post("/add", async(req,res)=>{
    //console.log(req.body);
    try {
        const newOrder = new Order(
            req.body
        )
        const save = await newOrder.save();
        res.status(200).json(save);
    } catch (error) {
        //console.log(error)
        res.status(500).json('Internal Server Error')
    }
});

// update

router.put("/:id", tokenandAdminVerification, async(req,res)=>{
    try {
        const update = await Order.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});

//DELETE
router.delete("/:id", tokenandAdminVerification, async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('Product Deleted Successfully');
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});
//GET user Order by ID
router.get("/find/:userid", async(req,res)=>{

    try {
        const getData = await Order.find({userId: req.params.userid});
        res.status(200).json(getData);
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});
router.get("/findorder/:id", async(req,res)=>{
    //console.log(req.params.id);
    try {
        const getData = await Order.findOne({_id: req.params.id});
        res.status(200).json(getData);
    } catch (error) {
        //console.log(error);
        res.status(500).json('Internal server Error');
    }
});
//productPerformance
router.get("/productPerformance/:id",tokenandAdminVerification,async(req,res)=>{
    //console.log(req.params);
    let id = req.params.id
    try {
        //const getData = await Order.find({'products':{'productId': req.params.id}}).countDocuments;
        const income = await Order.aggregate([
            {
                $unwind: "$products" // Unwind the products array
            },
            {
                $match: {
                    'products.productId': req.params.id // Match the product ID
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" }, // Extract month from createdAt
                    productId: "$products.productId" // Include productId for grouping
                }
            },
            {
                $group: {
                    _id: { month: "$month", productId: "$productId" }, // Group by month and productId
                    count: { $sum: 1 } // Count occurrences
                }
            },
            {
                $project: {
                    _id: 0, // Exclude _id field
                    month: "$_id.month", // Rename _id.month as month
                    count: 1 // Include count
                }
            }
        ]);
        
        res.status(200).json(income);
    } catch (error) {
        //console.log(error);
        res.status(500).json('Internal server Error');
    }
});
//GET all Orders
router.get("/",async(req,res)=>{
        //console.log(req.params);
        try {
            const Orders = await Order.find().sort({createdAt: -1});

            res.status(200).json(Orders);
        } catch (error) {
            //console.log(error);
            res.status(500).json('Internal server Error');
        }
});

//GET monthly Income
router.get("/income",tokenandAdminVerification,async(req,res)=>{
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1));
    try {
        const income = await Order.aggregate([
            {$match:{createdAt:{$gte: previousMonth}}},
            {$project:{
                    month:{$month: "$createdAt"},
                    sales:"$amount.netAmt",
                }
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum: "$sales"}
                }
            }
        ]).sort({_id: 1});
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});


module.exports = router;