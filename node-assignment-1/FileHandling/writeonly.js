// Mode 4: "w" → WRITE ONLY
// Meaning:

// Truncates file

// Creates new file if missing

// Cursor start

// Code:

const fs = require("fs");

fs.open("write.txt", "w", (err, fd) => {
  if (err) throw err;

  fs.write(fd, "Hello from w mode", () => {
    console.log("File overwritten/written!");
    fs.close(fd, () => {});
  });
});
