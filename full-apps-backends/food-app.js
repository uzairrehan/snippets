// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; 

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/food-delivery', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Define Mongoose Schemas
const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    menu: [{ 
        name: String, 
        description: String, 
        price: Number 
    }]
});

const OrderSchema = new mongoose.Schema({
    customer: { type: String, required: true }, 
    address: { type: String, required: true },
    restaurant: { type: String, required: true }, 
    items: [{ 
        name: String, 
        quantity: Number 
    }],
    status: { type: String, default: 'Pending' } 
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
const Order = mongoose.model('Order', OrderSchema);

// API Routes
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/orders', async (req, res) => {
    const order = new Order(req.body);
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/orders/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// **Explanation:**

// 1. **Project Setup:**
//    - Create a new project directory.
//    - Initialize npm: `npm init -y`
//    - Install dependencies:
//      ```bash
//      npm install express mongoose body-parser cors
//      ```

// 2. **Server File (server.js):**
//    - Import necessary modules.
//    - Create an Express app instance.
//    - Define the port for the server.
//    - Use middleware:
//      - `bodyParser.json()` to parse incoming JSON requests.
//      - `cors()` to enable Cross-Origin Resource Sharing (for frontend communication).
//    - Connect to MongoDB using `mongoose`.
//    - Define Mongoose schemas for `Restaurant` and `Order` with appropriate fields and validation.
//    - Create Mongoose models from the schemas.
//    - Define API routes:
//      - `GET /restaurants`: Get a list of all restaurants.
//      - `GET /restaurants/:id`: Get a specific restaurant by ID.
//      - `POST /orders`: Create a new order.
//      - `GET /orders`: Get a list of all orders.
//      - `GET /orders/:id`: Get a specific order by ID.
//      - `PUT /orders/:id`: Update an order by ID.
//    - Start the server and listen on the specified port.

// **Key Improvements:**

// - **Error Handling:** Includes basic error handling in each route to catch and handle potential issues gracefully.
// - **Data Validation:** Basic validation is implemented in the Mongoose schemas to ensure data integrity.
// - **Clear Structure:** The code is well-organized with clear separation of concerns (routes, models, middleware).
// - **Comments:** Added comments to explain the purpose of different code sections.

// **To Run:**

// 1. **Install MongoDB:** Download and install MongoDB on your local machine.
// 2. **Start MongoDB:** Run the MongoDB server.
// 3. **Run the Server:** Execute `node server.js` in the terminal.

// This provides a basic foundation for your food delivery app backend. You can further enhance it by:

// - Implementing more robust authentication and authorization.
// - Adding features like user accounts, order tracking, payment integration, etc.
// - Improving error handling and security.
// - Adding more detailed documentation and tests.

// Remember to adapt this code to your specific requirements and design.







// **1. CRUD Operations on Restaurants:**

// * **Create a Restaurant:**

const newRestaurant = new Restaurant({
  name: "Pizza Palace",
  address: "123 Main Street",
  phone: "(555) 555-1234",
  description: "Delicious pizzas made with fresh ingredients",
  image: "https://example.com/pizza.jpg",
  cuisine: "Italian",
  menu: [
    {
      name: "Margherita Pizza",
      description: "A classic pizza with tomato sauce and mozzarella cheese",
      price: 12.99,
      image: "https://example.com/margherita.jpg",
    },
    // Add more menu items
  ],
});

newRestaurant.save()
  .then((restaurant) => {
    console.log("Restaurant created successfully:", restaurant);
  })
  .catch((err) => {
    console.error("Error creating restaurant:", err);
  });

// * **Get All Restaurants:**

Restaurant.find()
  .then((restaurants) => {
    console.log("All restaurants:", restaurants);
  })
  .catch((err) => {
    console.error("Error getting restaurants:", err);
  });

// * **Get a Specific Restaurant:**

Restaurant.findById("restaurantId")
  .then((restaurant) => {
    if (!restaurant) {
      console.error("Restaurant not found");
    } else {
      console.log("Restaurant details:", restaurant);
    }
  })
  .catch((err) => {
    console.error("Error getting restaurant:", err);
  });

// * **Update a Restaurant:**

Restaurant.findByIdAndUpdate("restaurantId", {
  $set: {
    name: "New Restaurant Name",
    description: "Updated description",
  },
}, { new: true }) // Return the updated document
  .then((updatedRestaurant) => {
    if (!updatedRestaurant) {
      console.error("Restaurant not found");
    } else {
      console.log("Restaurant updated successfully:", updatedRestaurant);
    }
  })
  .catch((err) => {
    console.error("Error updating restaurant:", err);
  });

// **2. User Authentication and Order Management:**

// * This schema requires further development to implement user authentication (login, signup) and order management functionalities.
// * You'll need to implement endpoints for user registration, login, and order placement.
// * Orders will be associated with a specific user and restaurant using the defined references in the schema.

// **3. Additional Considerations:**

// * **Security:** Implement proper authentication and authorization mechanisms to protect user data and restrict unauthorized access.
// * **Error Handling:** Ensure proper error handling throughout your backend code to gracefully handle unexpected situations.
// * **Payment Integration:** Integrate a payment gateway to process online payments for orders.
// * **Scalability:** Consider using cloud databases and services for scalability as your app grows.

// Remember, this is a starting point. You can extend this codebase to build a comprehensive food delivery app backend with additional features and functionalities.
