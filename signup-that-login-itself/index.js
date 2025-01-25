// Here’s an example of how to implement a signup that logs the user in automatically using Express.js, MongoDB, bcrypt, and JWT:

// ### 1. Install dependencies:
// ```bash
// npm install express mongoose bcryptjs jsonwebtoken dotenv
// ```

// ### 2. Setup your environment variables (`.env`):
// ```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
// ```

// ### 3. Create a basic Express server with MongoDB setup, user schema, and routes.

// #### `server.js`:
// ```javascript
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Signup and Login route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: savedUser._id, username: savedUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response with token
    res.status(201).json({
      message: 'User created successfully',
      token, // User is logged in immediately
    });
  } catch (err) {
    res.status(500).json({ message: 'Error saving user' });
  }
});

// Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// ```

// ### 4. Testing:
// - You can use Postman or a similar tool to test the `/signup` endpoint with a POST request:
//   - URL: `http://localhost:5000/signup`
//   - Body (JSON):
//     ```json
//     {
//       "username": "testUser",
//       "email": "testuser@example.com",
//       "password": "password123"
//     }
//     ```
// - After successful signup, the response will contain a JWT token:
//   ```json
//   {
//     "message": "User created successfully",
//     "token": "your_jwt_token_here"
//   }
//   ```

// ### 5. Protecting Routes (Optional):
// To protect other routes and require authentication, you can verify the JWT token by using middleware:

// #### `authMiddleware.js`:
// ```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
// ```

// Now, you can use this middleware in other routes to protect them.

// #### Example of a protected route:
// ```javascript
const authenticateToken = require('./authMiddleware');

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});
// ```

// ### Notes:
// - This example combines both the signup and login process.
// - After the user signs up, a JWT token is returned, automatically logging them in.
// - You can then store this token on the client side (e.g., in `localStorage` or `sessionStorage`).
// - You can use that token to authenticate the user in subsequent requests to protected routes.