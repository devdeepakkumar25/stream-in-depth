const { required } = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playgounddb")
  .then(() => console.log("Connected to MongoDb..."))
  .catch((err) => console.error(err.message));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    match: /[A-Za-z]/gi,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    required: true,
    validate: {
      validator: async function (value) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(value && value.length > 0);
          }, 2000);
        });
      },
      message: "A course should have at least one tag.",
    },
  },

  //   tags: {
  //     type: Array,
  //     validate: {
  //       isAsync: true,
  //       validator: async function (v) {
  //         return new Promise((resolve) => {
  //           setTimeout(() => {
  //             const result = v && v.length > 0;
  //             resolve(result);
  //           }, 4000);
  //         });
  //       },

  //       //   validator: function (v) { // for sync validatior
  //       //     return v && v.length > 0;
  //       //   },
  //       message: "A course should have at leat one tag.",
  //     },
  //   },
  date: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const course1 = new Course({
  name: "Node.js Course",
  author: "Mosh",
  tags: ["node", "backend"],
  price: 10,
  isPublished: true,
});
// course1
//   .save()
//   .then((res) => console.log("Saved : ", res.name))
//   .catch((err) => console.log(err.message));

async function createCourse() {
  const course2 = new Course({
    name: "React Course",
    // category: "web",
    author: "Mosh",
    // tags: ["react", "frontend"],
    // tags: null,
    price: 15,
    isPublished: true,
  });
  try {
    await course2.validate();
    // const result = await course2.save();
    // console.log(result);
  } catch (error) {
    for (let field in error.errors) {
      console.log(error.errors[field].message);
    }
    if (error.errors.category) {
      console.log("Category was not present");
    }
    console.log("Error: ", error.message);
  }
}

createCourse();
async function createCourses() {
  const result = await Course.insertMany([
    {
      name: "MongoDB Course",
      author: "Deepak",
      tags: ["mongodb", "database"],
      price: 12,
      isPublished: false,
    },
    {
      name: "Django Course",
      author: "Deepak",
      tags: ["backend", "backend"],
      price: 12,
      isPublished: false,
    },
  ]);

  console.log(result);

  console.log("Courses inserted Succeddully");
}

// createCourses();

async function getCourses() {
  const courses = await Course.find();

  console.log(courses);
}

// getCourses();

// Course.find()
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err.message));

async function getCourses1() {
  const courses = await Course.find({
    author: "Mosh",
    isPublished: true,
  })
    .limit(11)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// getCourses1();

// eq (equal)
// ne (not equal )

// gt greater than
// gte (greater than or equal to)

// lt (less than)
// lte less than or equal to

// in
// nin not in

async function getCourses2() {
  const courses = await Course
    //   .find({
    //     price: { $gte: 10},
    //   })
    //   .find({
    //     price: { $gte: 10, $lte: 20 },
    //   })
    .find({
      price: { $in: [10, 15, 20] },
    })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 });

  console.log(courses);
}

// getCourses2();

async function getCourse3() {
  const courses = await Course.find()
    // .or([{ author: "Deepak" }, { isPublished: true }])
    // .and([{ author: "Deepak" }, { isPublished: false }])
    .and([{ author: "Deepak Kumar Dev" }, { isPublished: true }])

    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, author: 1 });

  console.log(courses);
}

// getCourse3();

async function getCourse4() {
  const courses = await Course.find({
    // author: /^Mosh/g, // Starts with mosh
    // author: /Mosh$/gi,
    author: /.*Mosh.*/i,
  })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, author: 1 });

  console.log(courses);
}

// getCourse4();

async function getCourses5() {
  const courses = await Course.find({
    author: "Mosh",
    isPublished: true,
  })
    .limit(10)
    .sort({ name: 1 })
    .countDocuments();
  console.log(courses);
}

// getCourses5();

async function getCourses6() {
  const pageNumber = 1;
  const pageSize = 10;

  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

// getCourses6();

async function updateCourse1(id) {
  // Approach ; Query first
  // findById()
  // Modify its properties
  // save

  const course = await Course.findById(id);
  if (!course) return;

  //   course.isPublished = true;
  //   course.author = "Deepak Dev";
  course.set({
    isPublished: true,
    author: "Deepak Kumar Dev",
  });

  const result = await course.save();

  console.log(result);
  // Approach :Update first
  // update Directly
  // Optionally : get the updated document
}

// const id = "6968b1f126b93d1cc5cb4b69";

// updateCourse1(id);

// getCourse3();

async function updateCourse2(id) {
  //   const course = await Course.updateMany({ isPublished: false });
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Deepak Kumar Dev",
        isPublished: true,
      },
    }
  );
  console.log(result);
}

const id = "6968b23356ca47996a266f05";

// updateCourse2(id);

async function updateCourse3(id) {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Deepak Kumar Dev",
        isPublished: true,
      },
    },
    { new: true } // return updated document
  );

  console.log(result);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  //   Course.deleteMany(); no filter delete all
}

async function removeCourseQueryFirst(id) {
  const course = await Course.findById(id);
  if (!course) {
    console.log("Course not found");
    return;
  }

  const result = await course.deleteOne();
  console.log(result);
}

async function removeCourse(id) {
  const result = await Course.findByIdAndDelete(id);
  if (!result) {
    console.log("Course not found");
    return;
  }

  console.log("Deleted:", result.name);
}
