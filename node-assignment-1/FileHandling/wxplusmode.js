// Mode 7: "wx+" → READ+WRITE (FAIL IF EXIST)
// Meaning:

// Read + Write

// New file only

// Fail if file exists

const fs = require("fs");

fs.open("brandnex.txt", "wx+", (err, fd) => {
  if (err) {
    console.log("wx+ file already exists");
    return;
  }
  fs.write(fd, "fresh line!", () => {
    console.log("File created fresh using wx+");
    fs.close(fd, () => {});
  });
});
