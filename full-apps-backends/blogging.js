// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const blogRoutes = require('./routes/blogs');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/blog-app', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/blogs', blogRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// **models/Blog.js**

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema);

// **routes/blogs.js**

const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific blog
router.get('/:id', getBlog, (req, res) => {
    res.json(res.blog);
});

// Create a new blog
router.post('/', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a blog
router.patch('/:id', getBlog, async (req, res) => {
    if (req.body.title != null) {
        res.blog.title = req.body.title;
    }
    if (req.body.content != null) {
        res.blog.content = req.body.content;
    }
    if (req.body.author != null) {
        res.blog.author = req.body.author;
    }

    try {
        const updatedBlog = await res.blog.save();
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a blog
router.delete('/:id', getBlog, async (req, res) => {
    try {
        await res.blog.remove();
        res.json({ message: 'Blog Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get blog by ID
async function getBlog(req, res, next) {
    let blog;
    try {
        blog = await Blog.findById(req.params.id);
        if (blog == null) {
            return res.status(404).json({ message: 'Cannot find blog' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.blog = blog;
    next();
}

module.exports = router;

// **Explanation:**

// 1. **Project Setup:**
//    - Create a new Node.js project directory.
//    - Initialize the project using `npm init -y`.
//    - Install dependencies: `npm install express mongoose body-parser cors`

// 2. **Server File (`server.js`)**
//    - Import necessary modules.
//    - Create an Express app instance.
//    - Define the port for the server to listen on.
//    - Configure middleware:
//       - `cors()` for enabling Cross-Origin Resource Sharing.
//       - `bodyParser.json()` for parsing incoming JSON requests.
//    - Connect to MongoDB using `mongoose`.
//    - Define routes using `app.use()`.
//    - Start the server using `app.listen()`.

// 3. **Model File (`models/Blog.js`)**
//    - Define a Mongoose schema for the blog data structure:
//       - `title`: String (required)
//       - `content`: String (required)
//       - `author`: String (required)
//       - `date`: Date (default: current date/time)
//    - Create a Mongoose model using the schema.

// 4. **Routes File (`routes/blogs.js`)**
//    - Create an Express router instance.
//    - Define routes for CRUD operations:
//       - **GET /api/blogs:** Get all blogs.
//       - **GET /api/blogs/:id:** Get a specific blog by ID.
//       - **POST /api/blogs:** Create a new blog.
//       - **PATCH /api/blogs/:id:** Update an existing blog.
//       - **DELETE /api/blogs/:id:** Delete a blog.
//    - Use a middleware function (`getBlog`) to find and validate
















// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/users');
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads')); // Serve images from 'uploads' folder

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/blog-app', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// models/Blog.js

const mongoose = require('mongoose');

const blogSchemaa = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String, 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema);

// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);

// routes/blogs.js

const express = require('express');
const Blog = require('../models/Blog');

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific blog
router.get('/:id', getBlog, (req, res) => {
    res.json(res.blog);
});

// Create a new blog
router.post('/', upload.single('image'), async (req, res) => { 
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        image: req.file ? req.file.filename : null 
    });

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a blog
router.patch('/:id', upload.single('image'), getBlog, async (req, res) => {
    if (req.body.title != null) {
        res.blog.title = req.body.title;
    }
    if (req.body.content != null) {
        res.blog.content = req.body.content;
    }
    if (req.body.author != null) {
        res.blog.author = req.body.author;
    }
    if (req.file) {
        res.blog.image = req.file.filename; 
    }

    try {
        const updatedBlog = await res.blog.save();
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a blog
router.delete('/:id', getBlog, async (req, res) => {
    try {
        await res.blog.remove();
        res.json({ message: 'Blog Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get blog by ID
async function getBlog(req, res, next) {
    let blog;
    try {
        blog = await Blog.findById(req.params.id);
        if (blog == null) {
            return res.status(404).json({ message: 'Cannot find blog' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.blog = blog;
    next();
}

module.exports = router;

// routes/users.js

const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt'); 

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            // Authentication successful
            res.json({ message: 'Login successful' }); 
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
// ```

// **Added Features:**

// - **Image Upload:**
//     - Added `multer` middleware for handling image uploads.
//     - Configured `multer` to store uploaded images in the `uploads` directory.
//     - Added `image` field to the `Blog` schema to store the image file name.
//     - Updated `create` and `update` blog routes to handle image uploads.
// - **User Authentication:**
//     - Added `User` model with `username` and `password` fields.
//     - Added `bcrypt` for password hashing.
//     - Added `register` route to create new users with hashed passwords.
//     - Added `login` route to authenticate users by comparing provided credentials with hashed passwords.
// - **Improved Error Handling:**
//     - More specific error messages in responses.

// **To use this code:**

// 1. **Install additional dependencies:**
//    ```bash
//    npm install multer bcrypt
//    ```
// 2. **Create an `uploads` directory** in your project root to store uploaded images.
// 3. **Run the server** using `node server.js`.

// **Note:**

// - This is a basic implementation and can be further enhanced with:
//     - JWT (JSON Web Tokens) for more secure authentication.
//     - User authorization (e.g., only allow authors to edit/delete their own blogs).
//     - Pagination for handling large datasets.
//     - Input validation and sanitization.
//     - Security measures like rate limiting and input filtering to prevent attacks.

// Remember to adapt this code to your specific needs and security requirements.
