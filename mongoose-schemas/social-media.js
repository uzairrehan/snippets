const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    max: 150
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  location: {
    type: String
  },
  website: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Post Schema
const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    max: 500
  },
  image: {
    type: String,
    default: ''
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Comment Schema (Optional if comments are standalone documents)
const CommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Message Schema (For direct messaging functionality)
const MessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Notification Schema
const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['like', 'comment', 'follow'],
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Export Models
const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const Message = mongoose.model('Message', MessageSchema);
const Notification = mongoose.model('Notification', NotificationSchema);




// **1. Core Concepts**

// * **Mongoose:** This code utilizes Mongoose, an Object Data Modeling (ODM) library for MongoDB. Mongoose provides a more intuitive way to interact with MongoDB documents by mapping them to JavaScript objects.

// * **Schemas:** The foundation of Mongoose are schemas. A schema defines the structure of a document within a MongoDB collection. 

//     * **User Schema:** This schema defines the structure for user documents. It includes fields like:
//         * `username`: Unique identifier for each user.
//         * `email`: Unique email address for each user.
//         * `password`: Hashed password for user authentication.
//         * `profilePicture`: URL or path to the user's profile picture.
//         * `bio`: A short bio about the user.
//         * `followers`: An array of user IDs representing users who follow this user.
//         * `following`: An array of user IDs representing users this user follows.
//         * `isAdmin`: Indicates whether the user has administrative privileges.
//         * `location`: The user's location.
//         * `website`: The user's website URL.
//         * `createdAt`: Timestamp of when the user account was created.

//     * **Post Schema:** This schema defines the structure for post documents. It includes fields like:
//         * `userId`: The ID of the user who created the post.
//         * `description`: Text content of the post.
//         * `image`: URL or path to an image associated with the post.
//         * `likes`: An array of user IDs who liked the post.
//         * `comments`: An array of comments associated with the post, each containing the commenter's ID, the comment text, and a timestamp.
//         * `createdAt`: Timestamp of when the post was created.

//     * **Comment Schema:** This schema defines the structure for comment documents. It includes fields like:
//         * `postId`: The ID of the post the comment belongs to.
//         * `userId`: The ID of the user who made the comment.
//         * `text`: The content of the comment.
//         * `createdAt`: Timestamp of when the comment was created.

//     * **Message Schema:** This schema defines the structure for direct messages between users. It includes fields like:
//         * `senderId`: The ID of the user who sent the message.
//         * `receiverId`: The ID of the user who received the message.
//         * `text`: The content of the message.
//         * `createdAt`: Timestamp of when the message was sent.

//     * **Notification Schema:** This schema defines the structure for notifications. It includes fields like:
//         * `userId`: The ID of the user who received the notification.
//         * `type`: The type of notification (e.g., 'like', 'comment', 'follow').
//         * `postId`: The ID of the post associated with the notification (if applicable).
//         * `senderId`: The ID of the user who triggered the notification.
//         * `createdAt`: Timestamp of when the notification was created.

// * **Model Creation:**
//     * `mongoose.model()`: This function is used to create Mongoose models. 
//         * The first argument is the singular name of the collection (e.g., 'User').
//         * The second argument is the corresponding schema.
//     * This creates model classes that can be used to interact with the MongoDB collection.

// * **Exporting Models:**
//     * The code exports all the created models (`User`, `Post`, `Comment`, `Message`, `Notification`) using `module.exports`. This allows other parts of the application to import and use these models.

// **2. Code Explanation**

// * **Import Mongoose:** 
//    ```javascript
//    const mongoose = require('mongoose'); 
//    ```
//    This line imports the Mongoose library.

// * **Define Schemas:** 
//    * Each schema defines the structure of a document in the corresponding collection. 
//    * `timestamps: true` option automatically adds `createdAt` and `updatedAt` fields to each document.

// * **Create Models:**
//    * `mongoose.model()` creates Mongoose models, which provide methods for interacting with the MongoDB collection.

// * **Export Models:**
//    * The `module.exports` statement makes the models accessible to other parts of the application.

// **In essence, this code defines the data structures for users, posts, comments, messages, and notifications within a social media or similar application using Mongoose and MongoDB.**

// I hope this explanation is helpful! Let me know if you have any further questions.
