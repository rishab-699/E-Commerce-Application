const router = require('express').Router();
const user = require('../modules/user');
const User = require('../modules/user');
const {verifyToken ,tokenandAuthorVerification, tokenandAdminVerification} = require('./verifyToken');

// update

router.put("/:id", tokenandAuthorVerification,async(req,res)=>{
    
    try {
        if(req.body.password){
            req.body.password = cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
        }
        const update = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});
//delete
router.delete("/:id", tokenandAuthorVerification,async(req,res)=>{
    
    try {
        await user.findByIdAndDelete(req.params.id);
        res.status(200).json('user deleted successfully')
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});
//get users Id
router.get("/find/:id", tokenandAdminVerification ,async(req,res)=>{
        try {   
            const getData = await User.findById(req.params.id);
            const {password, ...others} = getData._doc;
            res.status(200).json(others);
        } catch (error) {
            //console.log(error)
            res.status(500).json('Internal server Error');
        }
});

//get all users
router.get("/", tokenandAdminVerification ,async(req,res)=>{
    try {
        const getData = await User.find();
        res.status(200).json(getData);
    } catch (error) {
        //console.log(error)
        res.status(500).json('Internal server Error');
    }
});

module.exports = router;