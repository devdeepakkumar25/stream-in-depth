const fs = require("fs");

fs.open("sample.txt", "w", (err, fd) => {
  if (err) throw err;

  fs.write(fd, "Hello world", () => {
    console.log("Data Written");
  });

  fs.close(fd, () => {
    fs.open("sample.txt", "r", (err, fd) => {
      if (err) throw err;

      const buffer = Buffer.alloc(100);
      fs.read(fd, buffer, 0, 100, 0, (err, bytesRead) => {
        console.log(buffer.toString("utf8", 0, bytesRead));
        fs.close(fd, () => {
          console.log("File closed");
        });
      });
    });
  });
});



function writeFile() {
  fs.open("sample.txt", "w", (err, fd) => {
    if (err) throw err;

    console.log("Opened in write mode");

    fs.write(fd, "Hello World", (err) => {
      if (err) throw err;
      console.log("Data written to the file");
      fs.close(fd, () => {
        console.log("Write file closed");
        readFile();
      });
    });
  });
}


function readFile() {
  fs.open("sample.txt", "r", (err, fd) => {
    if (err) throw err;

    console.log("Opened file in read mode");

    const buffer = Buffer.alloc(100);

    fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead) => {
      if (err) throw err;

      console.log("File content: ", buffer.toString("utf-8", 0, bytesRead));

      fs.close(fd, () => {
        console.log("Read file closed");
      });
    });
  });
}

writeFile();
