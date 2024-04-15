const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    products:[{
        productId:{
            type: String,
        },
        qty:{
            type: Number,
            default: 1,
        },
        size:{
            type: String
        }
    }],
    amount:{type: Object, required: true},
    address:{type: Object, required: true},
    status:{type: String, default: "pending"},
    shippmentId:{type:String},
    payType:{type: String}
},{timestamps:true})

module.exports = mongoose.model('Order', OrderSchema);