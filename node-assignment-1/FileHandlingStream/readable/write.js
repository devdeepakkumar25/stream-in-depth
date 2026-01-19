const fs = require("fs");

fs.open("test.txt", "w", (err, fd) => {
  for (let i = 0; i < 50000; i++) {
    fs.write(fd, ` ${i} `, () => {});
  }
});
