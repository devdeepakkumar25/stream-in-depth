const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost/embeddeddb";

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("Error: ", err.message));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: authorSchema,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    author: {
      name: "Mosh",
      bio: "Backend instructor",
      website: "https://example.com",
    },
  });
  const result = await course.save();
  console.log("Created Course: ", result);
}

// createCourse();

async function getCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// getCourses();

async function getCourseById(courseId) {
  const course = await Course.findById(courseId);
  console.log("Course: ", course);
}

const courseId = "696a00e144e27b7bee88d5a7";
getCourseById(courseId);

async function updateAuthorName(courseId) {
  const course = await Course.findById(courseId);
  if (!course) return console.log("Course not found");

  course.author.name = "Deepak";
  course.author.bio = "Database instructor";
  await course.save();
  console.log("Updated doc and saved: ", course);
}

// updateAuthorName(courseId);

async function updateAuthorNameDirect(courseId) {
  const result = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "Deepak Kumar Dev",
      },
    }
  );

  console.log("Updated : ", result);
}

// updateAuthorNameDirect(courseId);

async function updateAuthor(courseId) {
  const course = await Course.findByIdAndUpdate(
    courseId,
    {
      author: {
        name: "Deepak Kumar Dev",
        bio: "Full-stack developer",
        website: "https://deepak.dev",
      },
    },
    { new: true }
  );
  console.log("Updated findByIdAndUpdate : ", course);
}

// updateAuthor(courseId);

async function removeAuthorName(courseId) {
  const result = await Course.updateOne(
    { _id: courseId },
    {
      $unset: {
        "author.name": "",
      },
    }
  );
  console.log("Removed author name: ", result);
}

// removeAuthorName(courseId);

async function removeAuthor(courseId) {
  const result = await Course.updateOne(
    { _id: courseId },
    {
      $unset: {
        author: "",
      },
    }
  );
  console.log("Removed author: ", result);
}

// removeAuthor(courseId);

async function deleteCourse(courseId) {
  const result = await Course.findByIdAndDelete(courseId);
  console.log("Deleted: ", result);
}

// deleteCourse(courseId);

async function findOrCreateAuthor(authorData) {
  let author = await Author.findOne({ name: authorData.name });

  if (author) {
    console.log("Author already exists. Using existing author.");
    return author;
  }

  author = new Author({
    name: authorData.name,
    bio: authorData.bio,
    website: authorData.website,
  });
  const result = await author.save();
  console.log("New Author created: ", result);
  return author;
}

async function createCourseWithAuthor(courseName, authorData) {
  const author = await findOrCreateAuthor(authorData);

  const course = new Course({
    name: courseName,
    author: {
      name: author.name,
      bio: author.bio,
      website: author.website,
    },
  });

  const result = await course.save();
  console.log("Course created with embedded author: ");
  console.log(result);
}

createCourseWithAuthor("Node.js Mastery", {
  name: "Mosh",
  bio: "Backend instructor",
  website: "https://example.com",
});
