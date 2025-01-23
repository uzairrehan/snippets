const mongoose = require('mongoose');

// Customer Schema
const customerSchema = new mongoose.Schema({
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
  phone: {
    type: String,
  },
  company: {
    type: String,
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Subscription Schema
const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  billingInterval: {
    type: String,
    enum: ['Monthly', 'Quarterly', 'Yearly'],
    required: true,
  },
  features: [String], 
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
  ],
});

// Invoice Schema
const invoiceSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Overdue'],
    default: 'Pending',
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
const Customer = mongoose.model('Customer', customerSchema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = { Customer, Subscription, Invoice };

// **Explanation:**

// * **Customer Schema:**
//     * `name`: String, required, trimmed
//     * `email`: String, required, unique, lowercase
//     * `phone`: String (optional)
//     * `company`: String (optional)
//     * `subscription`: ObjectId referencing the Subscription schema
//     * `createdAt`: Date, defaults to current timestamp
//     * `updatedAt`: Date, updated on modification

// * **Subscription Schema:**
//     * `name`: String, required, trimmed
//     * `price`: Number, required, minimum 0
//     * `billingInterval`: String, enum: 'Monthly', 'Quarterly', 'Yearly', required
//     * `features`: Array of Strings (list of features included in the subscription)
//     * `customers`: Array of ObjectIds referencing the Customer schema

// * **Invoice Schema:**
//     * `customer`: ObjectId referencing the Customer schema, required
//     * `subscription`: ObjectId referencing the Subscription schema, required
//     * `amount`: Number, required, minimum 0
//     * `dueDate`: Date, required
//     * `status`: String, enum: 'Pending', 'Paid', 'Overdue', default: 'Pending'
//     * `createdAt`: Date, defaults to current timestamp
//     * `updatedAt`: Date, updated on modification

// **Key Considerations:**

// * **Data Validation:**
//     * Use Mongoose's built-in validation features (e.g., `required`, `min`, `unique`, `enum`) to ensure data integrity.
// * **Data Security:**
//     * Implement secure password storage and handling for user authentication.
// * **Relationships:**
//     * Use `ref` and `populate` to efficiently query and retrieve related data (e.g., customer's subscription, subscription's features, invoices for a customer).
// * **Indexes:**
//     * Create indexes on frequently queried fields (e.g., `email`, `subscription name`, `invoice dueDate`) for better performance.
// * **Error Handling:**
//     * Implement proper error handling and validation in your Express routes.

// **Note:**

// * This is a basic example, and you may need to adjust the schemas based on the specific requirements of your SaaS management application.
// * You might want to add features like:
//     * Usage tracking
//     * Support tickets
//     * Payment integration
//     * Customer portal
//     * Team management
//     * Discounting and promotional offers

// I hope this helps!
