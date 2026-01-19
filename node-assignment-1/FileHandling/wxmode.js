// Mode 5: "wx" → WRITE ONLY EXCLUSIVE
// Meaning

// Like "w"

// But fails if file exists (safe write)

const fs = require("fs");

fs.open("unique.txt", "wx", (err, fd) => {
  if (err) {
    console.log("File already exist! wx failed");
    return;
  }
  fs.write(fd, "This file is new!", () => {
    console.log("wx created a new file!");
    fs.close(fd, () => {});
  });
});
