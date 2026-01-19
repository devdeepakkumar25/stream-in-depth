// Mode 2: "r+" → READ + WRITE
// Meaning:

// File must exist

// Read and write allowed

// Cursor at beginning

const fs = require("fs");

fs.open("sample.txt", "r+", (err, fd) => {
  if (err) throw err;

  fs.write(fd, "start-", 0, "utf-8", () => {
    console.log("Write using r + mode!");
    fs.close(fd, () => {});
  });
});
