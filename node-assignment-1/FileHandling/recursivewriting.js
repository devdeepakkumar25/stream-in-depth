const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.open("log.txt", "a", (err, fd) => {
  if (err) throw err;

  function askUser() {
    rl.question("Enter text to write or type 'exit' :", (input) => {
      if (input === "exit") {
        console.log("Closing File...");
        fs.close(fd, () => {
          rl.close();
          console.log("File closed.");
        });
        return;
      }

      fs.write(fd, input + "\n", (err) => {
        if (err) throw err;

        console.log("Content Writtent!");
        askUser();
      });
    });
  }
  askUser();
});
