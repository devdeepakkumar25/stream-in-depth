// Mode 1: "r" → READ ONLY
// Meaning:

// Opens file only for reading

// File must exist

// Pointer at start

// Cannot write into file

const fs = require("fs");

fs.open("sample.txt", "r", (err, fd) => {
  if (err) {
    console.log("Error: ", err.message);
    return;
  }
  console.log("Opened in read-only mode: r");

  let buffer = Buffer.alloc(50);

  fs.read(fd, buffer, 0, 50, 0, (err, bytes) => {
    console.log(buffer.toString());
    fs.close(fd, () => {});
  });
});
