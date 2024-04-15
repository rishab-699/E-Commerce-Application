const router = require('express').Router();
const products = require('../modules/products');
const { verifyToken, tokenandAdminVerification } = require('./verifyToken');

//Add Product

router.post("/add", tokenandAdminVerification, async(req,res)=>{
    //console.log(req.body);
    try {
        const newProduct = new products({
            pname: req.body.pname,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            detail: req.body.detail,
            qty: req.body.qty,
            img: req.body.img,
        })
        const save = await newProduct.save();
        res.status(200).json(save);
    } catch (error) {
        //console.log(error)
        res.status(500).json('Internal Server Error')
    }
});

// update

router.put("/:id", tokenandAdminVerification, async(req,res)=>{
    try {
        const update = await products.findByIdAndUpdate(req.params.id,{
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
        await products.findByIdAndDelete(req.params.id);
        res.status(200).json('Product Deleted Successfully');
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});
//GET products by ID
router.get("/find/:id",async(req,res)=>{
    //console.log(req.params);
    let id = req.params.id
    try {
        const getData = await products.findById(id);
        res.status(200).json(getData);
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});


//GET all product
router.get("/",async(req,res)=>{
        const qNew = req.query.new;
        const qCategory= req.query.category;
        const qbasePrice = Number(req.query.basePrice) || 0;
        const qtopPrice = Number(req.query.topPrice) || 0;
        //console.log(qbasePrice," ", qtopPrice);
        //console.log(req.query)
        try {
            let product;
            if(qNew){
                product = await products.find({qty:{$gt: 0}}).sort({createdAt: -1}).limit(2);
                
            }else if(qCategory){
                product = await products.find({category:{$in: [qCategory]}, qty:{$gt: 0}});
                if(qbasePrice && qtopPrice){
                    product = await products.find({category:{$in: [qCategory]}, qty:{$gt: 0}, price:{$gte: qbasePrice, $lte: qtopPrice}});

                }else{
                    product = await products.find({category:{$in: [qCategory]}, qty:{$gt: 0}, price:{$gte: qbasePrice}});

                }
            }else if(qbasePrice >0 || qtopPrice>0){
                if(qbasePrice>0 && qtopPrice>0){
                    product = await products.find({qty:{$gt: 0}, price:{$gte: qbasePrice, $lte: qtopPrice}});

                }else{
                    product = await products.find({qty:{$gt: 0}, price:{$gte: qbasePrice}});
                }
            }else{
                product = await products.find({qty:{$gt: 0}});
            }
            
            res.status(200).json(product);
        } catch (error) {
            //console.log(error);
            res.status(500).json('Internal server Error');
        }
});

module.exports = router;