const mongoose = require('mongoose');

// Expense Schema
const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
});

// Create Mongoose models
const Expense = mongoose.model('Expense', expenseSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Expense, User };

// **Explanation:**

// * **Expense Schema:**
//     * `amount`: Number, required, minimum 0
//     * `description`: String, required
//     * `category`: String, required (e.g., "Food", "Rent", "Entertainment")
//     * `date`: Date, required
//     * `user`: ObjectId referencing the User schema, required
//     * `createdAt`: Date, defaults to current timestamp

// * **User Schema:**
//     * `name`: String, required, trimmed
//     * `email`: String, required, unique, lowercase
//     * `password`: String, required (should be hashed and salted)
//     * `expenses`: Array of ObjectIds referencing the Expense schema

// **Key Considerations:**

// * **Data Validation:**
//     * Use Mongoose's built-in validation features (e.g., `required`, `min`, `unique`) to ensure data integrity.
// * **Data Security:**
//     * Hash and salt user passwords for security.
// * **Relationships:**
//     * Use `ref` and `populate` to efficiently query and retrieve related data (e.g., user's expenses).
// * **Indexes:**
//     * Create indexes on frequently queried fields (e.g., `email`, `date`) for better performance.
// * **Error Handling:**
//     * Implement proper error handling and validation in your Express routes.

// **Note:**

// * This is a basic example, and you may need to adjust the schemas based on the specific requirements of your expense tracker application.
// * You might want to add features like:
//     * Income tracking
//     * Budgeting
//     * Recurring expenses
//     * Reporting and analytics (e.g., charts and graphs)
//     * Currency support

// I hope this helps!
