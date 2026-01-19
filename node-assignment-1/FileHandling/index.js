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

fs.open("sample.txt", "r", (err, fd) => {
  if (err) {
    console.error(err.message);
    return;
  }

  const buffer = Buffer.alloc(100);
  fs.read(fd, buffer, 0, 100, 0, (err, bytesRead) => {
    console.log(buffer.toString("utf8", 0, bytesRead));

    fs.close(fd, () => {
      console.log("File closed");
    });
  });
});
