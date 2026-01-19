const fs = require("fs");

fs.open("sample.txt", "a", (err, fd) => {
  if (err) throw err;

  console.log("Opened in append mode");

  fs.write(fd, " Welcome Deepak Dev ", () => {
    console.log("Data appended Succefully");
  });
});
