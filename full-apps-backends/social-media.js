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
mongoose.connect('mongodb://localhost:27017/social_media_app', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: String,
    bio: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', userSchema);

// Define Post Schema
const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String
    }]
});

const Post = mongoose.model('Post', postSchema);

// User Routes
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followers following');
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: 'User not found' });
    }
});

app.put('/users/:id/follow', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const userToFollow = await User.findById(req.body.userId);

        if (!userToFollow.followers.includes(currentUser._id)) {
            await userToFollow.updateOne({ $push: { followers: currentUser._id } });
            await currentUser.updateOne({ $push: { following: userToFollow._id } });
            res.status(200).json('User followed');
        } else {
            res.status(403).json('You already follow this user');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post Routes
app.post('/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('user').sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user likes comments.user');
        res.json(post);
    } catch (err) {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.put('/posts/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json('Post liked');
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json('Post unliked');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/posts/:id/comments', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const newComment = {
            user: req.body.userId,
            text: req.body.text
        };
        await post.updateOne({ $push: { comments: newComment } });
        res.status(200).json('Comment added');
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

// **Explanation:**

// 1. **Import necessary modules:**
//    - `express`: For creating the web server.
//    - `mongoose`: For interacting with MongoDB.
//    - `bodyParser`: For parsing incoming request bodies.
//    - `cors`: For enabling Cross-Origin Resource Sharing.

// 2. **Create an Express app:**
//    - Initialize an Express application.

// 3. **Middleware:**
//    - Use `bodyParser.json()` to parse JSON data from requests.
//    - Use `cors()` to allow requests from different origins.

// 4. **Connect to MongoDB:**
//    - Establish a connection to the MongoDB database.

// 5. **Define Mongoose schemas:**
//    - `userSchema`: Defines the structure for user documents (username, email, password, etc.).
//    - `postSchema`: Defines the structure for post documents (user, content, likes, comments).

// 6. **Create Mongoose models:**
//    - `User` and `Post` models are created from their respective schemas.

// 7. **User Routes:**
//    - `/users`: 
//       - `POST`: Creates a new user.
//       - `GET/:id`: Retrieves a user by ID.
//    - `/users/:id/follow`: Handles user following actions.

// 8. **Post Routes:**
//    - `/posts`: 
//       - `POST`: Creates a new post.
//       - `GET`: Retrieves all posts.
//    - `/posts/:id`: 
//       - `GET`: Retrieves a post by ID.
//    - `/posts/:id/like`: Handles post liking/unliking.
//    - `/posts/:id/comments`: Adds a new comment to a post.

// 9. **Start the server:**
//    - Listen on the specified port.

// **To run this server:**

// 1. **Install dependencies:**
//    ```bash
//    npm install express mongoose body-parser cors
//    ```

// 2. **Create a MongoDB database:**
//    - You can use a local MongoDB instance or a cloud-based service like MongoDB Atlas.

// 3. **Run the server:**
//    ```bash
//    node server.js
//    ```

// This is a basic example. You can extend it further by adding features like:

// - User authentication (e.g., JWT)
// - Image uploads
// - Notifications
// - Search functionality
// - And more

// Remember to adapt this code to your specific requirements and security considerations.




// **1. Image Uploads:**

// * **Install necessary packages:**
   ```bash
   npm install multer cloudinary cloudinary-storage
   ```

// * **Configure Cloudinary (or your preferred image hosting service):**
//    - Create a Cloudinary account and obtain your API credentials.
//    - Configure Cloudinary storage:

     const cloudinary = require('cloudinary').v2;
     const { CloudinaryStorage } = require('multer-storage-cloudinary');

     cloudinary.config({
         cloud_name: 'your_cloud_name',
         api_key: 'your_api_key',
         api_secret: 'your_api_secret'
     });

     const storage = new CloudinaryStorage({
         cloudinary: cloudinary,
         params: {
             folder: 'social_media_app', // Optional: Organize images in a folder
             allowed_formats: ['jpg', 'jpeg', 'png']
         }
     });

     const upload = multer({ storage });

// * **Update Post Schema:**

   const postSchemaa = new mongoose.Schema({
       user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
       content: String, 
       image: String, // Store the URL of the uploaded image
       likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
       comments: [{ 
           user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
           text: String
       }]
   });

// * **Update Post Route:**

   app.post('/posts', upload.single('image'), async (req, res) => { 
       try {
           const newPost = new Post({
               user: req.body.userId, 
               content: req.body.content,
               image: req.file.path // Store the image URL 
           });
           const savedPost = await newPost.save();
           res.status(201).json(savedPost);
       } catch (err) {
           res.status(400).json(err);
       }
   });

// **2. Notifications:**

// * **Define Notification Schema:**

   const notificationSchema = new mongoose.Schema({
       user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
       type: String, // e.g., 'like', 'comment', 'follow'
       post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
       sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
       read: { type: Boolean, default: false }
   });

   const Notification = mongoose.model('Notification', notificationSchema); 

// * **Implement Notification Logic:**
//    - **Follow:** When a user follows another, create a "follow" notification for the followed user.
//    - **Like:** When a user likes a post, create a "like" notification for the post's author.
//    - **Comment:** When a user comments on a post, create a "comment" notification for the post's author.

//    **Example (in User Routes):**

   app.put('/users/:id/follow', async (req, res) => { 
       // ... (existing follow logic) 
       const notification = new Notification({
           user: userToFollow._id, 
           type: 'follow', 
           sender: currentUser._id 
       });
       await notification.save();
       res.status(200).json('User followed'); 
   });

// * **Retrieve Notifications:**
   app.get('/users/:id/notifications', async (req, res) => {
       try {
           const notifications = await Notification.find({ user: req.params.id })
               .populate('sender post')
               .sort({ createdAt: -1 }); 
           res.json(notifications);
       } catch (err) {
           res.status(500).json(err);
       }
   });

// * **Mark Notifications as Read:**
   app.put('/notifications/:id/read', async (req, res) => {
       try {
           const notification = await Notification.findById(req.params.id);
           notification.read = true;
           await notification.save();
           res.status(200).json('Notification marked as read');
       } catch (err) {
           res.status(500).json(err);
       }
   });

// **3. Additional Features:**

// * **User Search:** Implement a search endpoint to find users by username or other criteria.
// * **Hashtags:** Allow users to add hashtags to their posts and enable hashtag-based post discovery.
// * **User Profiles:** Enhance user profiles with details like location, website, etc.
// * **Direct Messaging:** Implement a private messaging feature between users.
// * **Story Feature:** Allow users to post ephemeral stories that disappear after 24 hours.
// * **Push Notifications:** Send real-time notifications to users using a service like Firebase Cloud Messaging (FCM).

// **Remember:**

// * **Security:** Implement proper security measures to prevent vulnerabilities like SQL injection, cross-site scripting (XSS), and data breaches.
// * **Error Handling:** Handle errors gracefully and return informative error responses to the client.
// * **Testing:** Write unit tests to ensure the functionality of your backend code.

// This enhanced implementation provides a more robust and feature-rich social media app backend. You can further customize and expand it based on your specific needs and requirements.
