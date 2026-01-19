// Mode 11: "ax+" → READ + APPEND EXCLUSIVE
// Meaning:

// full read + append

// create new

// error if exists
const fs = require("fs");
fs.open("uniqueEvents.txt", "ax+", (err, fd) => {
  if (err) {
    console.log("ax+ prevented overwrite.");
    return;
  }

  fs.write(fd, "unique log entry\n", () => {
    console.log("ax+ mode success");
    fs.close(fd, () => {});
  });
});
