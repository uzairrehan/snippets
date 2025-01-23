const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    inventory: {
        type: Number,
        default: 0,
        min: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                required: true,
            },
            comment: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1,
            },
        },
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
});

// Order Schema
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    shippingAddress: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    taxPrice: {
        type: Number,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
});

// Create Mongoose models
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Product, User, Order };





// **Explanation:**

// * **Product Schema:**
//     * `name`: String, required, unique
//     * `description`: String, required
//     * `price`: Number, required, positive
//     * `image`: String (optional)
//     * `category`: String, required
//     * `inventory`: Number, default 0, positive
//     * `reviews`: Array of objects, each with:
//         * `user`: ObjectId referencing the User schema
//         * `rating`: Number, between 1 and 5, required
//         * `comment`: String (optional)
//         * `createdAt`: Date, defaults to current timestamp

// * **User Schema:**
//     * `name`: String, required
//     * `email`: String, required, unique, lowercase
//     * `password`: String, required (should be hashed and salted)
//     * `address`: String (optional)
//     * `phone`: String (optional)
//     * `isAdmin`: Boolean, default false
//     * `cart`: Array of objects, each with:
//         * `product`: ObjectId referencing the Product schema
//         * `quantity`: Number, default 1, positive
//     * `orders`: Array of ObjectIds referencing the Order schema

// * **Order Schema:**
//     * `user`: ObjectId referencing the User schema, required
//     * `orderItems`: Array of objects, each with:
//         * `product`: ObjectId referencing the Product schema, required
//         * `name`: String, required
//         * `image`: String
//         * `price`: Number, required
//         * `quantity`: Number, required
//     * `shippingAddress`: String, required
//     * `paymentMethod`: String, required
//     * `paymentResult`: Object for storing payment details (optional)
//     * `taxPrice`: Number, default 0.0
//     * `shippingPrice`: Number, default 0.0
//     * `totalPrice`: Number, required
//     * `isPaid`: Boolean, default false
//     * `paidAt`: Date
//     * `isDelivered`: Boolean, default false
//     * `deliveredAt`: Date

// **Key Considerations:**

// * **Data Validation:**
//     * Use Mongoose's built-in validation features (e.g., `required`, `min`, `max`, `unique`) to ensure data integrity.
// * **Data Security:**
//     * Hash and salt user passwords for security.
// * **Relationships:**
//     * Use `ref` and `populate` to efficiently query and retrieve related data (e.g., user's orders, product reviews).
// * **Indexes:**
//     * Create indexes on frequently queried fields (e.g., `email`, `product name`) for better performance.
// * **Error Handling:**
//     * Implement proper error handling and validation in your Express routes.

// **Note:** This is a basic example, and you may need to adjust the schemas based on the specific requirements of your e-commerce application.
