E-Commerce MERN Stack

Intfoduction:
	The E-Commerce project is developed on MERN stack with the E-Commerce application of a clothing brand. It has basic functionality of the commerce application with necessary information on the admin side.
Scope:
	The Scope of the project is it cannot have multiple sellers.
Functionality:
•	Admin will perform all the CURD operations on the products.
•	Admin can manage his products list.
•	Admin will update the orders by providing the shipment id.
•	User can add products to his wishlist or cart directly if he wishes to buy it.
•	User can place the order.
•	User can view his order details with the products and view order status.
MongoDB Collections Schemas:
	Users Module:
{mobileNo:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: false,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
},{timestamps:true});
	Products Module:
{
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

	Order Module:
{
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

	Cart Module:
{
    userId:{
        type: String,
        required: true,
    },
    products:[{
        productId:{
            type: String,
        },
        size:{
            type: String,
        },
        qty:{
            type: Number,
            default: 1,
        },
    }]
    
},{timestamps:true})

To download this application fork this repositary

also forkm this two repositaries
https://github.com/rishab-699/E-Commerce--Admin
https://github.com/rishab-699/E-Commerce-Client
