const mongoose = require('mongoose');

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  tags: [String], 
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: true,
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
  bio: {
    type: String,
  },
  avatar: {
    type: String, 
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogPost',
    },
  ],
});

// Create Mongoose models
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const User = mongoose.model('User', userSchema);

module.exports = { BlogPost, User };

// **Explanation:**

// * **BlogPost Schema:**
//     * `title`: String, required, trimmed
//     * `content`: String, required
//     * `author`: ObjectId referencing the User schema, required
//     * `createdAt`: Date, defaults to current timestamp
//     * `updatedAt`: Date, updated on modification
//     * `tags`: Array of Strings (for categorization)
//     * `comments`: Array of objects, each with:
//         * `user`: ObjectId referencing the User schema
//         * `text`: String, required
//         * `createdAt`: Date, defaults to current timestamp

// * **User Schema:**
//     * `name`: String, required, trimmed
//     * `email`: String, required, unique, lowercase
//     * `password`: String, required (should be hashed and salted)
//     * `bio`: String (optional)
//     * `avatar`: String (optional)
//     * `blogs`: Array of ObjectIds referencing the BlogPost schema

// **Key Considerations:**

// * **Data Validation:**
//     * Use Mongoose's built-in validation features (e.g., `required`, `unique`) to ensure data integrity.
// * **Data Security:**
//     * Hash and salt user passwords for security.
// * **Relationships:**
//     * Use `ref` and `populate` to efficiently query and retrieve related data (e.g., user's blogs, blog post comments).
// * **Indexes:**
//     * Create indexes on frequently queried fields (e.g., `email`, `tags`) for better performance.
// * **Error Handling:**
//     * Implement proper error handling and validation in your Express routes.

// **Note:**

// * This is a basic example, and you may need to adjust the schemas based on the specific requirements of your blogging platform.
// * You might want to add features like:
//     * Featured image upload
//     * Comment moderation
//     * Social media sharing
//     * Search functionality
//     * Pagination for large datasets
//     * User roles (e.g., admin, moderator)

// I hope this helps!
