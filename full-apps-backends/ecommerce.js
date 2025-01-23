// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; 

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
        await product.remove();
        res.json({ message: 'Deleted Product' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
        if (req.body.name != null) {
            product.name = req.body.name;
        }
        if (req.body.description != null) {
            product.description = req.body.description;
        }
        if (req.body.price != null) {
            product.price = req.body.price;
        }
        if (req.body.image != null) {
            product.image = req.body.image;
        }
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


// **Explanation:**

// 1. **Project Setup:**
//    - Create a new project directory.
//    - Initialize Node.js project: `npm init -y`
//    - Install dependencies:
//      ```bash
//      npm install express mongoose body-parser cors
//      ```

// 2. **Server File (`server.js`)**
//    - Import necessary modules:
//      - `express`: For creating the Express.js server.
//      - `mongoose`: For interacting with MongoDB.
//      - `bodyParser`: For parsing request bodies.
//      - `cors`: For enabling Cross-Origin Resource Sharing.
//    - Create an Express.js instance (`app`).
//    - Define the port to listen on.
//    - Use middleware:
//      - `cors`: Allow requests from different origins.
//      - `bodyParser.json()`: Parse JSON request bodies.
//      - `bodyParser.urlencoded()`: Parse URL-encoded request bodies.
//    - Connect to MongoDB:
//      - Use `mongoose.connect()` to establish a connection to the MongoDB database.
//      - Handle connection success and errors.
//    - Define the `Product` schema:
//      - Create a Mongoose schema to define the structure of product documents in the database.
//      - Include fields like `name`, `description`, `price`, and `image`.
//    - Create the `Product` model:
//      - Create a Mongoose model using the schema to interact with the database.
//    - Define API routes:
//      - **GET /api/products:** Retrieve all products.
//      - **GET /api/products/:id:** Retrieve a single product by ID.
//      - **POST /api/products:** Create a new product.
//      - **DELETE /api/products/:id:** Delete a product by ID.
//      - **PUT /api/products/:id:** Update a product by ID.
//    - Start the server:
//      - Use `app.listen()` to start the server and listen on the specified port.

// **To run the server:**

// 1. Make sure you have MongoDB installed and running.
// 2. Save the code as `server.js`.
// 3. Run the server: `node server.js`

// This will start the server, and you can then use tools like Postman or a frontend application to interact with the API endpoints.

// **Note:**

// - This is a basic example and can be further enhanced by adding features like user authentication, cart functionality, order management, and more.
// - Replace `'mongodb://localhost:27017/ecommerce'` with your actual MongoDB connection string.
// - Consider using environment variables to manage sensitive information like database credentials.
// - Implement proper error handling and input validation for better security and robustness.

// This detailed guide provides a solid foundation for building an e-commerce app backend using Express.js and MongoDB. You can expand upon this by adding more complex features and integrating it with a frontend application to create a complete e-commerce solution.


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model('User', userSchema);

// Define Product Schema (as before)
// ...

// Define Cart Schema
const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 }
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

// User Routes
app.post('/api/users/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' }); 
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Product Routes (as before)
// ...

// Cart Routes
app.post('/api/carts', async (req, res) => {
    try {
        const { userId, productId } = req.body; 
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            const newCart = new Cart({ user: userId, items: [{ product: productId }] });
            await newCart.save();
            res.status(201).json(newCart);
        } else {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ product: productId });
            }
            await cart.save();
            res.json(cart);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/carts/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ... (other cart routes: update, remove, checkout)

// Start Server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});



// **Explanation of Added Features:**

// - **User Authentication:**
//     - Added `User` schema with username, email, and hashed password.
//     - Implemented `register` and `login` routes:
//         - `register`: Handles user registration, checks for existing users, and hashes the password before saving.
//         - `login`: Authenticates user credentials, generates a JWT (JSON Web Token) for secure session management.
// - **Basic Cart Functionality:**
//     - Added `Cart` schema to store user's cart items.
//     - Implemented `addToCart` route:
//         - Finds the user's cart or creates a new one if it doesn't exist.
//         - Adds the product to the cart or increments the quantity if the product already exists.
//     - Implemented `viewCart` route:
//         - Retrieves the user's cart and populates the product details for each item.

// **Note:**

// - This is a simplified implementation. You'll need to add more robust error handling, input validation, and security measures.
// - Replace `'your_secret_key'` with a strong, randomly generated secret key for JWT signing.
// - Implement proper authorization using JWTs to protect routes that require user authentication.
// - Consider using a more secure password hashing library like Argon2.
// - Add other cart functionalities like updating item quantities, removing items, and checkout.
// - Integrate with a payment gateway for processing payments.

// This enhanced code provides a starting point for building a more feature-rich e-commerce app backend. Remember to continue adding features and refining the code based on your specific requirements.
