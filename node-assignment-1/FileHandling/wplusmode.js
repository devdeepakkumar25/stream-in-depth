// Mode 6: "w+" → READ + WRITE
// Meaning:

// Read and write

// Overwrites file

// Creates if missing

const fs = require("fs");

fs.open("writeplus.txt", "w+", (err, fd) => {
  if (err) return;

  fs.write(fd, "New content using w+!", () => {
    console.log("Written and readable!");
    fs.close(fd, () => {});
  });
});
