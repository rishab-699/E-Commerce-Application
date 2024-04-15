const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pname:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: Array,
    },
    detail:[{
        size:{
            type: Array,
        },
        quantity:{
            type: Number,
        }
    }],
    img:{
        type: String,
        required: true,
    },
    qty:{
        type: Number,
        required: true,
    }
},{timestamps:true});

module.exports = mongoose.model('product', productSchema);