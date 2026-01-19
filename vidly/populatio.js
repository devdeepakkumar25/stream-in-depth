const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost/populationdb";
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to mongoDB...."))
  .catch((err) =>
    console.error("Could not connect to MongoDB... ", err.message)
  );

const authorSChema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const courseSchema = new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

const Author = mongoose.model("Author", authorSChema);

const Course = mongoose.model("Course", courseSchema);

async function createAuthor(name, boi, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();

  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  // const courses = await Course.find().select({ name: 1, author: 1 });
  const courses = await Course.find()
    // .populate("author", "name -_id")
    .populate({
      path: "author",
      select: { name: 1, _id: 0 },
      options: { sort: { name: 1 } },
    })

    .select("name author");

  console.log(courses);
}

// createAuthor("Mosh", "My bio", "My Website");

const authorId = "6969d9b71e57e9c5c68cdfca";

// createCourse("Node Course", authorId);

listCourses();

// const mongoose = require("mongoose");

// /* =======================
//    DATABASE CONNECTION
//    ======================= */
// const DB_URL = "mongodb://localhost/populationdb";

// mongoose
//   .connect(DB_URL)
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch(err =>
//     console.error("Could not connect to MongoDB:", err.message)
//   );

// /* =======================
//    AUTHOR SCHEMA & MODEL
//    ======================= */
// const authorSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   bio: {
//     type: String
//   },
//   website: {
//     type: String
//   }
// });

// const Author = mongoose.model("Author", authorSchema);

// /* =======================
//    COURSE SCHEMA & MODEL
//    ======================= */
// const courseSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Author",
//     required: true
//   }
// });

// const Course = mongoose.model("Course", courseSchema);

// /* =======================
//    CREATE AUTHOR
//    ======================= */
// async function createAuthor(name, bio, website) {
//   const author = new Author({
//     name,
//     bio,
//     website
//   });

//   const result = await author.save();
//   console.log("Author created:", result);
// }

// /* =======================
//    CREATE COURSE
//    ======================= */
// async function createCourse(name, authorId) {
//   const course = new Course({
//     name,
//     author: authorId
//   });

//   const result = await course.save();
//   console.log("Course created:", result);
// }

// /* =======================
//    LIST COURSES (POPULATE)
//    ======================= */
// async function listCourses() {
//   const courses = await Course.find()
//     .populate({
//       path: "author",
//       select: { name: 1, _id: 0 },
//       options: { sort: { name: 1 } }
//     })
//     .select({ name: 1, author: 1, _id: 0 });

//   console.log("Courses with populated authors:");
//   console.log(courses);
// }

// /* =======================
//    FUNCTION CALLS
//    ======================= */

// // createAuthor("Mosh", "My bio", "https://example.com");

// const authorId = "6969d9b71e57e9c5c68cdfca";

// // createCourse("Node Course", authorId);

// listCourses();
