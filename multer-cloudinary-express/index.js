// To integrate **Multer**, **Cloudinary**, and **MongoDB** in an Express.js project, you'll need to set up the following:

// 1. **Multer** to handle file uploads.
// 2. **Cloudinary** to store images (or any other media files) in the cloud.
// 3. **MongoDB** to store the file metadata (like the Cloudinary URL) and any other related data.

// ### Steps to set this up:

// 1. Install the necessary dependencies:

// ```bash
// npm install express multer cloudinary multer-storage-cloudinary mongoose
// ```

// - `express`: For creating the server.
// - `multer`: For handling file uploads.
// - `cloudinary`: For interacting with the Cloudinary API.
// - `multer-storage-cloudinary`: Multer storage engine for Cloudinary integration.
// - `mongoose`: For MongoDB integration.

// 2. Set up Cloudinary:

// - Create an account on [Cloudinary](https://cloudinary.com/).
// - After logging in, get your **Cloudinary API Key**, **API Secret**, and **Cloud Name**.

// ### Example: File Upload with Multer, Cloudinary, and MongoDB

// 1. **Server Setup (app.js or server.js)**

// ```js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Initialize express
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fileUpload', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the file model
const FileSchema = new mongoose.Schema({
  originalName: String,
  cloudinaryUrl: String,
});
const File = mongoose.model('File', FileSchema);

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret',
});

// Set up Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Specify folder for Cloudinary storage
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

const upload = multer({ storage: storage });

// API Endpoint to upload a file
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileData = new File({
      originalName: req.file.originalname,
      cloudinaryUrl: req.file.path,
    });

    await fileData.save();
    res.json({
      message: 'File uploaded successfully!',
      fileUrl: req.file.path,
      fileId: fileData._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload file' });
  }
});

// API Endpoint to fetch uploaded files
app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch files' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// ```

// ### Explanation:
// - **Multer** is used with **CloudinaryStorage** to upload files to Cloudinary.
// - **MongoDB** stores metadata about the file (like original file name and the Cloudinary URL).
// - When a file is uploaded, it's stored on Cloudinary, and the URL is saved in MongoDB.

// ### 2. **Uploading a File (HTML Form)**

// You can create a simple HTML form to test the file upload:

// ```html
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>File Upload</title>
// </head>
// <body>
//     <h1>Upload a File</h1>
//     <form action="http://localhost:3000/upload" method="POST" enctype="multipart/form-data">
//         <input type="file" name="file" required />
//         <button type="submit">Upload</button>
//     </form>
// </body>
// </html>
// ```

// This form will send the file to the `/upload` endpoint on your server.

// ### 3. **Fetching Uploaded Files**

// To list the uploaded files, you can call the `/files` endpoint:

// ```js
app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch files' });
  }
});
// ```

// You can use the following to fetch the files from the server:

// ```bash
// curl http://localhost:3000/files
// ```

// This will return a list of files in JSON format with their details, including Cloudinary URLs.

// ---

// ### **Different Scenarios**

// #### Scenario 1: Uploading Multiple Files

// You can modify the `upload` middleware to handle multiple files:

// ```js
app.post('/upload-multiple', upload.array('files', 5), async (req, res) => {
  try {
    const filesData = req.files.map((file) => ({
      originalName: file.originalname,
      cloudinaryUrl: file.path,
    }));

    await File.insertMany(filesData);
    res.json({
      message: 'Files uploaded successfully!',
      files: filesData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload files' });
  }
});
// ```

// This will allow users to upload multiple files at once.

// #### Scenario 2: Deleting a File from Cloudinary and MongoDB

// If you want to delete a file from both Cloudinary and MongoDB, you can create an endpoint like this:

// ```js
app.delete('/delete/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Delete from Cloudinary
    const publicId = file.cloudinaryUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    // Delete from MongoDB
    await file.remove();

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete file' });
  }
});
// ```

// This will:
// - Find the file in MongoDB using the provided `id`.
// - Delete the file from Cloudinary using the **public ID** (extracted from the Cloudinary URL).
// - Delete the file record from MongoDB.

// ---

// ### Conclusion

// In this setup, you have:
// - **Multer** handling file uploads.
// - **Cloudinary** storing the files.
// - **MongoDB** storing metadata about the uploaded files.

// You can extend this system based on your needs, like adding validation for file types or handling user authentication for secure file uploads.































// Here are a few more practical examples to help you further explore the integration of **Multer**, **Cloudinary**, and **MongoDB** in **Express.js**.

// ### Example 1: **Uploading a Profile Picture for a User**

// Let's assume you have a user schema, and each user can upload a profile picture. You can save the URL of the image in MongoDB and serve it on the user profile page.

// 1. **User Schema (User.js)**

// ```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: String, // URL of the image in Cloudinary
});

module.exports = mongoose.model('User', UserSchema);
// ```

// 2. **Server Setup for Profile Picture Upload (app.js)**

// ```js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const User = require('./User'); // Import User model

// const app = express();
// const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/profileUpload', { useNewUrlParser: true, useUnifiedTopology: true });

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret',
});

// Set up Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_profiles', // Specify folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage });

// API to upload a profile picture
app.post('/upload-profile-picture/:userId', upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID and update their profile picture URL
    const user = await User.findByIdAndUpdate(userId, { profilePicture: req.file.path }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile picture uploaded successfully!',
      profilePicture: req.file.path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload profile picture' });
  }
});

// API to get user profile with picture
app.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// ```

// ### How This Works:

// - **Upload Endpoint**: When a user uploads a profile picture, the image is stored on Cloudinary, and the URL of the image is saved in the `profilePicture` field of the MongoDB user document.
// - **Fetch User Profile**: You can retrieve the user's profile, including the profile picture, by accessing the `profilePicture` URL from Cloudinary.

// ### Example 2: **Uploading and Handling Video Files**

// If you want to allow video uploads, you can adjust the configuration to allow video file types.

// 1. **Setting up the Video Schema**

// ```js
const VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String, // URL to the video on Cloudinary
});

module.exports = mongoose.model('Video', VideoSchema);
// ```

// 2. **Server Setup for Video Upload**

// ```js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Video = require('./Video');

// const app = express();
// const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/videoUpload', { useNewUrlParser: true, useUnifiedTopology: true });

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret',
});

// Set up Multer storage for video
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'video_uploads', // Cloudinary folder
    allowed_formats: ['mp4', 'mov', 'avi'], // Accept video formats
  },
});

const upload = multer({ storage: storage });

// API to upload a video
app.post('/upload-video', upload.single('video'), async (req, res) => {
  try {
    const video = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.file.path,
    });

    await video.save();
    res.json({
      message: 'Video uploaded successfully!',
      videoUrl: req.file.path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload video' });
  }
});

// API to fetch videos
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch videos' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// ```

// ### How This Works:
// - **Upload Endpoint**: When a video is uploaded, the video is stored in Cloudinary, and its URL is saved in the MongoDB `videoUrl` field.
// - **Fetch Videos Endpoint**: You can retrieve a list of videos with their metadata, including the Cloudinary URL.

// ### Example 3: **Adding File Validation (File Type Check)**

// In some cases, you may want to validate file types before uploading to Cloudinary. You can add a file type check using **Multer's `fileFilter`** function.

// ```js
const multer = require('multer');
const path = require('path');

// File type validation for images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });
// ```

// ### How This Works:
// - **fileFilter**: This ensures only JPEG, PNG, and GIF files are allowed.
// - If the file type doesn't match the allowed formats, it returns an error.

// ### Example 4: **Handling Errors Gracefully**

// You can add error handling to your upload routes to catch any issues with the upload process and return a meaningful response to the client.

// ```js
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Your file handling logic here
    res.json({
      message: 'File uploaded successfully!',
      fileUrl: req.file.path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload file' });
  }
});
// ```

// ### How This Works:
// - If no file is uploaded, it returns a `400` error with a descriptive message.
// - Catches any server errors and responds with a `500` status.

// ---

// These examples should help you explore different use cases of **Multer**, **Cloudinary**, and **MongoDB** integration in an **Express.js** environment. You can extend these setups for other media types or more complex requirements.