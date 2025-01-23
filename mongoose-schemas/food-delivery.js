const mongoose = require('mongoose');

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String, 
  },
  cuisine: {
    type: String,
    required: true, 
  },
  menu: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      image: {
        type: String, 
      },
    },
  ],
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0,
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
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
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
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  orderItems: [
    {
      item: {
        type: String, 
        required: true, 
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Preparing', 'OutForDelivery', 'Delivered'],
    default: 'Pending',
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Create Mongoose models
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Restaurant, User, Order };

// **Explanation:**

// * **Restaurant Schema:**
//     * `name`: String, required, trimmed
//     * `address`: String, required
//     * `phone`: String (optional)
//     * `description`: String (optional)
//     * `image`: String (optional)
//     * `cuisine`: String, required
//     * `menu`: Array of objects, each with:
//         * `name`: String, required
//         * `description`: String (optional)
//         * `price`: Number, required, minimum 0
//         * `image`: String (optional)
//     * `rating`: Number, between 1 and 5, default 0
//     * `reviews`: Array of objects, each with:
//         * `user`: ObjectId referencing the User schema
//         * `rating`: Number, between 1 and 5, required
//         * `comment`: String (optional)
//         * `createdAt`: Date, defaults to current timestamp

// * **User Schema:**
//     * `name`: String, required, trimmed
//     * `email`: String, required, unique, lowercase
//     * `password`: String, required (should be hashed and salted)
//     * `phone`: String (optional)
//     * `address`: String (optional)
//     * `orders`: Array of ObjectIds referencing the Order schema

// * **Order Schema:**
//     * `user`: ObjectId referencing the User schema, required
//     * `restaurant`: ObjectId referencing the Restaurant schema, required
//     * `orderItems`: Array of objects, each with:
//         * `item`: String, required (name of the menu item)
//         * `price`: Number, required, minimum 0
//         * `quantity`: Number, required, minimum 1
//     * `totalPrice`: Number, required, minimum 0
//     * `status`: String, enum: 'Pending', 'Accepted', 'Preparing', 'OutForDelivery', 'Delivered', default: 'Pending'
//     * `deliveryAddress`: String, required
//     * `createdAt`: Date, defaults to current timestamp
//     * `updatedAt`: Date, updated on modification

// **Key Considerations:**

// * **Data Validation:**
//     * Use Mongoose's built-in validation features (e.g., `required`, `min`, `max`, `unique`) to ensure data integrity.
// * **Data Security:**
//     * Hash and salt user passwords for security.
// * **Relationships:**
//     * Use `ref` and `populate` to efficiently query and retrieve related data (e.g., user's orders, restaurant's menu).
// * **Indexes:**
//     * Create indexes on frequently queried fields (e.g., `email`, `restaurant name`, `order status`) for better performance.
// * **Error Handling:**
//     * Implement proper error handling and validation in your Express routes.

// **Note:**

// * This is a basic example, and you may need to adjust the schemas based on the specific requirements of your food delivery application.
// * You might want to add features like:
//     * Driver management
//     * Payment integration
//     * Order tracking
//     * Promotions and discounts
//     * Push notifications

// I hope this helps!
