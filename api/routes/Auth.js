const router = require('express').Router();
const User = require('../modules/user');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
//REGISTER
router.post("/register", async(req,res)=>{
    //console.log(req.body);
    try {
            const newUser = new User(
                {
                    name:req.body.name,
                    email: req.body.email,
                    mobileNo: req.body.mobileNo,
                    password: cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
                }
            );
            const save = await newUser.save();
            res.status(200).json({msg:'data saved', save});
    } catch (error) {
        //console.log(error)
        res.status(500).json('Internal Server Error')
    }
});

//LOGIN
router.post("/login", async(req, res)=>{
    try {
        const user = await User.findOne({email:{$eq: req.body.email}});
        const hashpassword = cryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);
        const userpassword = hashpassword.toString(cryptoJs.enc.Utf8);
        if(userpassword === req.body.password){
            const {password, ...others} = user._doc;
            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            {expiresIn:'3d'}
            )
            res.status(200).json({others, accessToken});
        }else{
            //console.log(req.body,"userpassword:",userpassword);
            res.status(401).json("Invalid Credentials")
        }
    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
})

module.exports = router;