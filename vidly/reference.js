const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost/populationdb";

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB: ", err.message));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
});

const Author = new mongoose.model("Author", authorSchema);

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
});

const Course = new mongoose.model("Course", courseSchema);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();

  console.log("Author created: ", result);
}

async function createCourse(name, authorId) {
  const course = new Course({
    name,
    author: authorId,
  });
  const result = await course.save();
  console.log("Course created: ", result);
}

async function listCourses() {
  const courses = await Course.find()
    .populate({
      path: "author",
      select: { name: 1, _id: 0 },
      options: { sort: { name: 1 } },
    })
    .select({ name: 1, author: 1, _id: 0 });

  console.log("Course with populated authors: ");
  console.log(courses);
}

// createAuthor("Deepak", "MCA", "http://deepak.com");

const authorId = "6969fa73b4ac7bcc47f91f41";

// createCourse("Node.js", authorId);

listCourses();
