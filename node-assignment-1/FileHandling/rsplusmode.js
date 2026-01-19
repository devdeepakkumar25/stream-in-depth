// Mode 3: "rs+" → SYNC READ + WRITE
// Meaning:

// Same as r+

// Forces direct I/O

// Bypasses OS cache

// Used for low-level hardware reading

const fs = require("fs");

fs.open("sample.txt", "rs+", (err, fd) => {
  if (err) return console.log(err.message);

  console.log("opend using rs+");
  fs.close(fd, () => {});
});
