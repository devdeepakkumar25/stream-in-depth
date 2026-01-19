// Mode 10: "a+" → READ + APPEND
// Meaning:

// Read allowed

// Append allowed

// Cursor always ends

fs.open("events.txt", "a+", (err, fd) => {
  if (err) throw err;

  fs.write(fd, "Event logged!\n", () => {
    console.log("Append + Read mode activated!");

    fs.close(fd, () => {});
  });
});
