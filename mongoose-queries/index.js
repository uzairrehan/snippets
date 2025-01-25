// Here’s a complete Express.js example demonstrating various Mongoose queries, including creating, reading, updating, and deleting documents from a MongoDB collection. This example assumes you have `Express`, `Mongoose`, and `body-parser` installed. 

// ### 1. Install dependencies:

// ```bash
// npm install express mongoose body-parser
// ```

// ### 2. Create `server.js`:

// ```js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error: ", error));

// Define a Mongoose schema and model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model("User", userSchema);

// 1. Create a new user
app.post("/user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Get a user by ID
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Update a user
app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Delete a user
app.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 6. Find users by age
app.get("/users/age/:age", async (req, res) => {
  try {
    const users = await User.find({ age: req.params.age });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 7. Find users by name (using regex for partial match)
app.get("/users/name/:name", async (req, res) => {
  try {
    const users = await User.find({ name: new RegExp(req.params.name, "i") });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 8. Count number of users
app.get("/users/count", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ userCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 9. Sort users by age
app.get("/users/sort", async (req, res) => {
  try {
    const sortedUsers = await User.find().sort({ age: 1 }); // 1 for ascending, -1 for descending
    res.status(200).json(sortedUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 10. Paginate users
app.get("/users/page/:page", async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const limit = 5;
  try {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const totalUsers = await User.countDocuments();
    res.status(200).json({
      users,
      page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// ```

// ### 3. How it works:
// - **Create a user** (`POST /user`): Adds a new user to the database.
// - **Get all users** (`GET /users`): Fetches all users.
// - **Get a user by ID** (`GET /user/:id`): Fetches a specific user by their MongoDB `_id`.
// - **Update a user** (`PUT /user/:id`): Updates an existing user's details.
// - **Delete a user** (`DELETE /user/:id`): Deletes a specific user.
// - **Find users by age** (`GET /users/age/:age`): Finds all users of a given age.
// - **Find users by name (partial match)** (`GET /users/name/:name`): Finds users whose names match the given string (case-insensitive).
// - **Count the number of users** (`GET /users/count`): Returns the total number of users.
// - **Sort users by age** (`GET /users/sort`): Sorts users by age in ascending order.
// - **Paginate users** (`GET /users/page/:page`): Paginates users with a specified page number.

// ### 4. Run the server:

// ```bash
// node server.js
// ```

// You can now interact with the endpoints using Postman or any HTTP client.

// This example demonstrates a wide range of Mongoose queries you can use within an Express.js app!


























// Sure! Here are examples of Mongoose queries using logical operators like `$or` and `$and`.

// ### Example: Using `$or` and `$and` in Mongoose Queries

// #### 1. **Using `$or`**: The `$or` operator allows you to query documents that match at least one of the conditions provided.

// ```js
// Example: Find users with age 25 or name 'John'
app.get("/users/or", async (req, res) => {
  try {
    const users = await User.find({
      $or: [{ age: 25 }, { name: 'John' }]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// ```

// In this query:
// - It finds all users whose `age` is `25` or whose `name` is `'John'`.

// #### 2. **Using `$and`**: The `$and` operator allows you to query documents that match all the conditions provided.

// ```js
// Example: Find users who are 25 years old and whose name is 'John'
app.get("/users/and", async (req, res) => {
  try {
    const users = await User.find({
      $and: [{ age: 25 }, { name: 'John' }]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// ```

// In this query:
// - It finds all users whose `age` is `25` **and** whose `name` is `'John'`.

// #### 3. **Combining `$or` and `$and`**: You can combine `$or` and `$and` to create more complex queries.

// ```js
// Example: Find users who are either 25 years old or have the name 'John',
// and whose email contains 'gmail.com'
app.get("/users/or-and", async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        {
          $or: [{ age: 25 }, { name: 'John' }]
        },
        { email: /gmail\.com$/ } // Regular expression to match emails ending with 'gmail.com'
      ]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// ```

// In this query:
// - It finds all users who are either `25` years old or whose name is `'John' **and** whose email ends with `'gmail.com'`.

// #### 4. **Using `$ne` (Not Equal)**: You can combine `$ne` with `$or` or `$and`.

// ```js
// Example: Find users whose age is not 25 and whose name is not 'John'
app.get("/users/ne", async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        { age: { $ne: 25 } },   // Not equal to 25
        { name: { $ne: 'John' } } // Not equal to 'John'
      ]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// ```

// In this query:
// - It finds all users whose `age` is **not** `25` **and** whose `name` is **not** `'John'`.

// #### 5. **Using `$in`**: The `$in` operator checks if a field's value is in a list of values.

// ```js
// Example: Find users whose age is either 25, 30, or 35
app.get("/users/in", async (req, res) => {
  try {
    const users = await User.find({
      age: { $in: [25, 30, 35] }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// ```

// In this query:
// - It finds all users whose `age` is in the array `[25, 30, 35]`.

// ### More Complex Queries Example:

// You can also use other logical operators like `$gt` (greater than), `$lt` (less than), `$gte` (greater than or equal), and `$lte` (less than or equal) within `$or` and `$and`.

// ```js
// Example: Find users whose age is greater than 30 or less than 20, 
// and whose name contains 'John' (case insensitive)
app.get("/users/complex", async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        {
          $or: [
            { age: { $gt: 30 } }, // Age greater than 30
            { age: { $lt: 20 } }  // Age less than 20
          ]
        },
        { name: /John/i } // Case insensitive match for 'John'
      ]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// ```

// In this query:
// - It finds all users whose `age` is either greater than 30 **or** less than 20 **and** whose `name` contains `'John'`, case-insensitively.

// ### Summary of Logical Operators in Mongoose:
// - `$or`: Matches documents that satisfy at least one of the conditions.
// - `$and`: Matches documents that satisfy all of the conditions.
// - `$ne`: Matches documents where the field is **not** equal to the specified value.
// - `$in`: Matches documents where the field's value is in a list of values.
// - `$gt`: Matches documents where the field's value is greater than the specified value.
// - `$lt`: Matches documents where the field's value is less than the specified value.
// - `$gte`: Matches documents where the field's value is greater than or equal to the specified value.
// - `$lte`: Matches documents where the field's value is less than or equal to the specified value.

// These operators allow for very flexible and powerful querying in MongoDB via Mongoose. Let me know if you need more examples!