const fs = require("fs");

// fs.open("sample.txt", "r", (err, fd) => {
//   if (err) {
//     console.log("Error: ", err.message);
//     return;
//   }
//   console.log("Opened in read-only mode: r");
//   let buffer = Buffer.alloc(500);
//   fs.read(fd, buffer, 0, 500, 0, (err, bytes) => {
//     console.log(buffer.toString());
//     fs.close(fd, () => {});
//   });
// });

fs.open("sample.txt", "r", (err, fd) => {
  if (err) {
    console.log("Error: ", err.message);
  }
  console.log("FD: ", fd);

  let data = "";

  const buffer = Buffer.alloc(50);

  function readNext() {
    fs.read(fd, buffer, 0, buffer.length, null, (err, bytesRead) => {
      if (err) throw err;

      if (bytesRead > 0) {
        data += buffer.toString("utf-8", 0, bytesRead) + "\n";
        readNext();
      } else {
        console.log("File Content: ");
        console.log(data);
        fs.close(fd, () => {});
      }
    });
  }
  readNext();
});
