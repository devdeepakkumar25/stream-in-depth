const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost/populationdb";
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connecte to MongoDB..."))
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

const Author = mongoose.model("Author", authorSchema);

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  authors: [authorSchema],
});

const Course = mongoose.model("Course", courseSchema);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log("Author created: ", result);
}

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
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

  console.log("Course with populated authors");
  console.log(courses);
}

// createAuthor("Mosh", "My bio", "https://example.com");

// const authorId = "6969e34c860ba4a7c480ebc5";

// createCourse("Node Course", [
//   new Author({ name: "Mosh", bio: "My Bio", website: "https://exp.com" }),
//   new Author({ name: "John", bio: "My Bio", website: "https://exp.com" }),
// ]);

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();

  console.log(course);
}

// addAuthor(
//   "6969ee1490782dacc4458ee3",
//   new Author({
//     name: "Deepak Kumar Dev",
//     bio: "My Bio",
//     website: "https://exp.com",
//   })
// );

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);

  if (!course) {
    console.log("Course not found");
    return;
  }

  course.authors.pull(authorId);

  await course.save();

  console.log("Author removed successfully");
}

removeAuthor("6969ee1490782dacc4458ee3", "6969ee1490782dacc4458ee2");

// removeAuthor("6969ee1490782dacc4458ee3", "6969ee1490782dacc4458ee2");

// listCourses();

const courseId = "6969e3eb5ae49df8aa1377ed";

async function updateCourseAuthor(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "Deepak Kumar Dev",
      },
    }
  );
  console.log(course);
}

async function updateCourseAuthorRemoveProperty(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $unset: {
        "author.name": "",
      },
    }
  );

  console.log(course);
}

// updateCourseAuthor(courseId);

// updateCourseAuthorRemoveProperty(courseId);
