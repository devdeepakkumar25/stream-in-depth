const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/populationdb")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Error: ", err.message));

const authroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authroSchema);

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  authors: [authroSchema],
});

const Course = mongoose.model("Course", courseSchema);

async function createAuthor(name, bio, website) {
  let author = await Author.findOne({ name });

  if (author) {
    console.log("Auhtor already exists");
    return author;
  }

  author = new Author({ name, bio, website });

  const result = await author.save();

  console.log("Author created", result);
  return author;
}

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();

  console.log("Course created: ", result);
}

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();

  console.log("Course created: ", result);
}

async function addAuthorToCourse(courseId, authorData) {
  const course = await Course.findById(courseId);
  if (!course) return console.log("Course not found");

  let author = await Author.findOne({ name: authorData.name });

  if (!author) {
    author = new Author(authorData);

    await author.save();
    console.log("New author created");
  } else {
    console.log("Using existing author");
  }

  course.authors.push({
    _id: author._id,
    name: authro.name,
    bio: author.bio,
    website: author.website,
  });

  await course.save();

  console.log("Author embedded into course");
}

async function getCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function getCourse(courseId) {
  const course = await Course.findById(courseId);

  console.log(course);
}

async function updateAuthorInCourse(courseId, authorId) {
  const course = await Course.findById(courseId);
  if (!course) return console.log("Course not found");

  const author = course.authors.id(authorId);

  if (!author) return console.log("Author not found");

  author.name = "Deepak Kumar Dev";
  author.bio = "Full Stack Developer";

  await course.save();

  console.log("Author updated using doc.save()");
}

async function updateAuthorDirect(courseId, authroId) {
  const reuslt = await Course.updateOne(
    { _id: courseId, "authors.id": authroId },
    {
      $set: {
        "authors.$.name": "Deepak umar Dev",
      },
    }
  );

  console.log("Authro update using updateone: ", result);
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  if (!course) return console.log("Course not found");

  course.authros.pull(authroId);

  await course.save();

  console.log("Author removed");
}

async function removeAuthorDirect(courseId, authorId) {
  const result = await Course.updateOne(
    { _id: courseId },
    {
      $pull: {
        authors: { _id: authorId },
      },
    }
  );

  console.log("Author removed (direct):", result);
}

async function deleteCourse(courseId) {
  const result = await Course.findByIdAndDelete(courseId);
  console.log("Course deleted:", result);
}

async function extractAuthorFromCourse(courseId, authorId) {
  // 1️⃣ Find the course
  const course = await Course.findById(courseId);

  if (!course) {
    console.log("Course not found");
    return;
  }

  // 2️⃣ Find the embedded author
  const embeddedAuthor = course.authors.id(authorId);

  if (!embeddedAuthor) {
    console.log("Author not found in course");
    return;
  }

  // 3️⃣ Check if author already exists in Author collection
  const existingAuthor = await Author.findById(embeddedAuthor._id);

  if (existingAuthor) {
    console.log("Author already exists in Author collection");
    return existingAuthor;
  }

  // 4️⃣ Insert embedded author into Author collection
  const author = new Author({
    _id: embeddedAuthor._id, // preserve same ID
    name: embeddedAuthor.name,
    bio: embeddedAuthor.bio,
    website: embeddedAuthor.website,
  });

  await author.save();

  console.log("Author successfully extracted and saved to Author collection");
  return author;
}

(async function () {
  const author = await createAuthor(
    "Mosh",
    "Backend instructor",
    "https://example.com"
  );

  await createCourse("Node.js Mastery", []);

  const courseId = "6969ee1490782dacc4458ee3";

  await addAuthorToCourse(courseId, {
    name: "Mosh",
    bio: "Backend instructor",
    website: "https://example.com",
  });

  await updateAuthorInCourse(courseId, author._id);

  await removeAuthor(courseId, author._id);

  await getCourses();
})();
