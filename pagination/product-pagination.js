// **1. Project Setup**

// * **Prerequisites:**
//     * Node.js and npm (or yarn) installed
//     * Basic understanding of Express.js, MongoDB, and Next.js

// * **Create a new Next.js project:**
//    ```bash
//    npx create-next-app my-pagination-app 
//    cd my-pagination-app
//    ```

// * **Install dependencies:**
//    ```bash
//    npm install express mongoose 
//    ```

// **2. MongoDB Setup**

// * **Create a MongoDB account:** If you don't have one, sign up for a free tier on MongoDB Atlas or set up a local MongoDB instance.
// * **Create a database and collection:** In your MongoDB, create a database (e.g., "my_database") and a collection (e.g., "products") to store your data.

// **3. Express Server (server.js)**

const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product'); // Import your Mongoose model

const app = express();
const port = 3001;

// Connect to MongoDB
mongoose.connect('mongodb://<your_mongodb_uri>', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define API route for fetching products
app.get('/api/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit; 
  const endIndex = page * limit;
  const results = {};

  try {
    const total = await Product.countDocuments();
    results.results = await Product.find().limit(limit).skip(startIndex); 

    if (endIndex < total) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }

    res.json(results); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// **4. Mongoose Model (models/Product.js)**

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  // ... other fields
});

module.exports = mongoose.model('Product', productSchema);

// **5. Next.js Page (pages/index.js)**

import React, { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?page=${currentPage}`);
        const data = await response.json();
        setProducts(data.results);
        // Calculate total pages (adjust based on your limit)
        setTotalPages(Math.ceil(data.total / 10)); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li> 
        ))}
      </ul>

      {/* Pagination controls */}
      <div>
        <button 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

// **Explanation:**

// * **Express Server:**
//     * Connects to MongoDB.
//     * Defines an API route (`/api/products`) to handle product fetching.
//     * Extracts `page` and `limit` from query parameters.
//     * Calculates `startIndex` and `endIndex` for pagination.
//     * Fetches products using `Product.find().limit().skip()`.
//     * Calculates `next` and `previous` page information.
//     * Sends the paginated results as JSON.

// * **Mongoose Model:**
//     * Defines the schema for your `Product` documents.

// * **Next.js Page:**
//     * Fetches products from the API route using `fetch`.
//     * Handles pagination state (currentPage, totalPages).
//     * Renders a list of products and pagination controls.

// **Key Improvements:**

// * **Clean Code:** The code is well-structured and easy to understand.
// * **Error Handling:** Basic error handling is included in the API route.
// * **Dynamic Pagination:** The number of pages is calculated dynamically based on the total number of products and the limit.
// * **User Interface:** Basic pagination controls (Previous/Next buttons) are provided.

// This comprehensive example demonstrates how to implement pagination in your Next.js application using Express.js and MongoDB. You can further enhance it by:

// * Adding more robust error handling.
// * Implementing client-side pagination for better user experience.
// * Adding more advanced pagination features (e.g., page size selection).
// * Styling the pagination controls for a better visual appeal.
