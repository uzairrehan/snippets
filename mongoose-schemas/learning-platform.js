const mongoose = require('mongoose');

// Course Schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  image: {
    type: String, 
  },
  lessons: [
    {
      title: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Instructor Schema
const instructorSchema = new mongoose.Schema({
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
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

// Student Schema
const studentSchema = new mongoose.Schema({
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
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

// Create Mongoose models
const Course = mongoose.model('Course', courseSchema);
const Instructor = mongoose.model('Instructor', instructorSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = { Course, Instructor, Student };

// **Explanation:**

// * **Course Schema:**
//     * `title`: String, required, trimmed
//     * `description`: String, required
//     * `instructor`: ObjectId referencing the Instructor schema, required
//     * `category`: String, required
//     * `price`: Number, minimum 0
//     * `image`: String (optional)
//     * `lessons`: Array of objects, each with:
//         * `title`: String, required
//         * `videoUrl`: String (optional)
//         * `content`: String (optional)
//     * `students`: Array of ObjectIds referencing the Student schema
//     * `createdAt`: Date, defaults to current timestamp
//     * `updatedAt`: Date, updated on modification

// * **Instructor Schema:**
//     * `name`: String, required, trimmed
//     * `email`: String, required, unique, lowercase
//     * `password`: String, required (should be hashed and salted)
//     * `bio`: String (optional)
//     * `courses`: Array of ObjectIds referencing the Course schema

// * **Student Schema:**
//     * `name`: String, required, trimmed
//     * `email`: String, required, unique, lowercase
//     * `password`: String, required (should be hashed and salted)
//     * `enrolledCourses`: Array of ObjectIds referencing the Course schema

// **Key Considerations:**

// * **Data Validation:**
//     * Use Mongoose's built-in validation features (e.g., `required`, `unique`, `min`) to ensure data integrity.
// * **Data Security:**
//     * Hash and salt passwords for both instructors and students.
// * **Relationships:**
//     * Use `ref` and `populate` to efficiently query and retrieve related data (e.g., instructor's courses, student's enrolled courses).
// * **Indexes:**
//     * Create indexes on frequently queried fields (e.g., `email`, `category`) for better performance.
// * **Error Handling:**
//     * Implement proper error handling and validation in your Express routes.

// **Note:**

// * This is a basic example, and you may need to adjust the schemas based on the specific requirements of your online learning platform.
// * You might want to add features like:
//     * Course progress tracking
//     * Quizzes and assignments
//     * Discussion forums
//     * Certificates of completion
//     * Payment integration
//     * User roles (e.g., admin)

// I hope this helps!
