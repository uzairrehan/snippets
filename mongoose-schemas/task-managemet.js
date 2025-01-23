const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Todo', 'In Progress', 'Done'],
    default: 'Todo',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
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
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task', 
    },
  ],
});

// Create Mongoose models
const Task = mongoose.model('Task', taskSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Task, User };

// **Explanation:**

// * **Task Schema:**
//     * `title`: String, required, trimmed
//     * `description`: String (optional)
//     * `status`: String, enum: 'Todo', 'In Progress', 'Done', default: 'Todo'
//     * `priority`: String, enum: 'Low', 'Medium', 'High', default: 'Medium'
//     * `dueDate`: Date (optional)
//     * `createdAt`: Date, defaults to current timestamp
//     * `updatedAt`: Date, updated on modification
//     * `user`: ObjectId referencing the User schema, required

// * **User Schema:**
//     * `name`: String, required, trimmed
//     * `email`: String, required, unique, lowercase
//     * `password`: String, required (should be hashed and salted)
//     * `tasks`: Array of ObjectIds referencing the Task schema

// **Key Considerations:**

// * **Data Validation:**
//     * Use Mongoose's built-in validation features (e.g., `required`, `enum`) to ensure data integrity.
// * **Data Security:**
//     * Hash and salt user passwords for security.
// * **Relationships:**
//     * Use `ref` and `populate` to efficiently query and retrieve related data (e.g., user's tasks).
// * **Indexes:**
//     * Create indexes on frequently queried fields (e.g., `email`) for better performance.
// * **Error Handling:**
//     * Implement proper error handling and validation in your Express routes.

// **Note:**

// * This is a basic example, and you may need to adjust the schemas based on the specific requirements of your task management application. 
// * You might want to add features like labels, subtasks, due dates, reminders, and more complex status tracking.
// * Consider using middleware to automatically update the `updatedAt` field whenever a task is modified.
// * For production environments, implement robust security measures and consider using a more secure password storage mechanism.

// I hope this helps!
