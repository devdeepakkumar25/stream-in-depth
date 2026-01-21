const fs = require("fs");

// Blocks the event loop. Use only for scripts, CLIs, or startup code.
// Creates file if not exists

// Overwrites file if exists

// Blocks execution until done

function writeFileSyncExample() {
  fs.writeFileSync("write.txt", "Hello from writeFileSync", "utf-8");
  console.log("File written sync");
}

// writeFileSyncExample();

// Low-level sync (openSync → writeSync → closeSync)
// "w" → write + truncate

// More control (used in systems / libraries)

// Rarely needed in apps

function writeFileUsingFdSync() {
  const fd = fs.openSync("write.txt", "w");
  fs.writeFileSync(fd, "Hello from fd sync");
  fs.closeSync(fd);
  console.log("File written using file descriptor sync");
}

// writeFileUsingFdSync();

// writeFile with callback (recommended callback way)
// Non-blocking

// Error handled in callback

// Cleaner than manual open/write/close

function writeFileCallback() {
  console.log("Program Strated");

  // fs.writeFile("write.txt", "Hello from callback", "utf-8", (err) => {
  fs.writeFile(
    "write.txt",
    "Hello from callback",
    { encoding: "utf-8", flag: "w" },
    (err) => {
      if (err) {
        console.error("Error: ", err.message);
        return;
      }
      console.log("File writtend callback");
    },
  );

  //   fs.writeFile(
  //   "write.txt",
  //   "\nhello from callback 2\n",
  //   { encoding: "utf-8", flag: "a" },
  //   (error) => {
  //     if (error) {
  //       console.log(error.message);
  //       return;
  //     }
  //     console.log("File write ");
  //   },
  // );
}

// writeFileCallback();

// Low-level callback (open → write → close)

function writeFileUsingFdCallback() {
  fs.open("write.txt", "w", (err, fd) => {
    if (err) return console.error(err);

    fs.write(fd, "Hello from fd callback", (err) => {
      if (err) return console.error(err);

      fs.close(fd, () => {
        console.log("File written using fd");
      });
    });
  });
}

// writeFileUsingFdCallback();
