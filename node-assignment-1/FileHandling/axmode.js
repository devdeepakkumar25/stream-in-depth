//  Mode 9: "ax" → APPEND ONLY EXCLUSIVE
// Meaning:

// New file only

// Append-only

// Fail if exists
fs.open("newlog.txt", "ax", (err, fd) => {
  if (err) {
    console.log("File exists, cannot create using ax!");
    return;
  }

  fs.write(fd, "first entry\n", () => {
    console.log("ax wrote entry!");
    fs.close(fd, () => {});
  });
});
