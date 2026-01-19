const fs = require("fs");

fs.open("sample.txt", "w", (err, fd) => {
  if (err) throw err;
  console.log("Opened in write mode");
  fs.write(fd, "Hello World", () => {
    console.log("Data Written to the file.");
    fs.close(fd, () => {
      console.log("File closed");
    });
  });
});
