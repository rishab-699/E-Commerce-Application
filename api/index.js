const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/userroute');
const productRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const reportRoute = require('./routes/reports');
const twilio = require('twilio');
const cors = require('cors');
const authRoute = require('./routes/Auth')
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const dbname = 'shoppingwebsite'
mongoose.connect(process.env.mongourl,{dbName:dbname}).then(console.log('connected to mongoose')).catch((err)=> console.log(err));

//PRODUCT Image Upload

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"productImages")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})
const upload = multer({storage:storage});
app.use("/images", express.static(path.join(__dirname,"productImages")));
app.use("/api/upload",upload.single("file"),(req,res)=>{
    try {
        if (!req.file) {
          return res.status(400).json("No file uploaded");
        }
        res.status(200).json("File has been uploaded");
      } catch (error) {
        console.error(error);
        console.log(req.body);
        res.status(500).json("Internal server error");
      }
})

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/order', orderRoute);
app.use('/api/reports', reportRoute);
app.get('/', (req,res)=>{
    res.status(200).json('hello this is from simple server');
});

async function sendOTP(body, number){
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    return client.messages.create({body:body, from: process.env.phoneno , to:number})
    .then(true).catch(false);
}

app.put("/otp", (req,res)=>{
    if(sendOTP(req.body.msg, req.body.number)){
        res.status(200).json(true);
    }else{
        res.status(500).json(false);
    }
})



const server=app.listen(process.env.PORT,()=>{
    const { address, port } = server.address();
    console.log(`Server running at http://${address}:${port}/`);
    console.log('server started on port: ', process.env.PORT);
})