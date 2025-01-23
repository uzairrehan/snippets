const mongoose = require('mongoose');

// Event Schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, 
  },
  location: {
    type: String,
  },
  capacity: {
    type: Number,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    min: 0,
  },
  image: {
    type: String, 
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
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
  phone: {
    type: String,
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking', 
    },
  ],
});

// Booking Schema
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, 
  },
  guests: {
    type: Number,
    min: 1,
    required: true,
  },
  totalPrice: {
    type: Number,
    min: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Mongoose models
const Event = mongoose.model('Event', eventSchema);
const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Event, User, Booking };

// **Explanation:**

// * **Event Schema:**
//     * `title`: String, required, trimmed
//     * `description`: String (optional)
//     * `date`: Date, required
//     * `time`: String (optional)
//     * `location`: String (optional)
//     * `capacity`: Number, minimum 1, default 1
//     * `price`: Number, minimum 0
//     * `image`: String (optional)
//     * `isPublished`: Boolean, default false (controls event visibility)
//     * `createdAt`: Date, defaults to current timestamp
//     * `updatedAt`: Date, updated on modification

// * **User Schema:**
//     * `name`: String, required, trimmed
//     * `email`: String, required, unique, lowercase
//     * `password`: String, required (should be hashed and salted)
//     * `phone`: String (optional)
//     * `bookings`: Array of ObjectIds referencing the Booking schema

// * **Booking Schema:**
//     * `user`: ObjectId referencing the User schema, required
//     * `event`: ObjectId referencing the Event schema, required
//     * `date`: Date, required (might be the same as event date or a specific date for the booking)
//     * `time`: String (optional)
//     * `guests`: Number, minimum 1, required
//     * `totalPrice`: Number, minimum 0, required (calculated based on event price and guests)
//     * `createdAt`: Date, defaults to current timestamp

// **Key Considerations:**

// * **Data Validation:**
//     * Use Mongoose's built-in validation features (e.g., `required`, `min`, `unique`, `enum`) to ensure data integrity.
// * **Data Security:**
//     * Hash and salt user passwords for security.
// * **Relationships:**
//     * Use `ref` and `populate` to efficiently query and retrieve related data (e.g., user's bookings, event details).
// * **Indexes:**
//     * Create indexes on frequently queried fields (e.g., `email`, `event date`) for better performance.
// * **Error Handling:**
//     * Implement proper error handling and validation in your Express routes.
// * **Business Logic:**
//     * Implement logic for:
//         * Checking event availability (capacity, date/time conflicts)
//         * Calculating and storing `totalPrice` in the `Booking` schema
//         * Handling booking confirmations, cancellations, and updates
//         * Managing event publishing and unpublishing

// **Note:**

// * This is a basic example, and you may need to adjust the schemas based on the specific requirements of your event booking system.
// * You might want to add features like:
//     * Ticket types (e.g., general admission, VIP)
//     * Discounts and promotions
//     * Waiting lists
//     * Reviews and ratings
//     * Location-based search
//     * Payment integration

// I hope this helps!
