const readline = require("node:readline/promises");
const readlineSync = require("node:readline");

const { stdin: input, stdout: output } = require("node:process");

const rlSync = readlineSync.createInterface({ input, output });

rlSync.question("what do you think about node js", (answer) => {
  console.log(`Thank you for your valuable advice: ${answer} `);
  rlSync.close();
});

rlSync.on("line", (input) => {
  console.log(`Recevied :${input}`);
  rlSync.close();
});

rlSync.on("history", (history) => {
  console.log(`Received history : ${history}`);
  rlSync.close();
});

rlSync.on("pause", () => {
  console.log("Readline paused");
});

rlSync.on("resume", () => {
  console.log("Readline resumed");
});

(async () => {
  const rl = readline.createInterface({ input, output });

  const answer = await rl.question("What do you think of node.js: ");

  try {
    console.log(`Thank you for your valuable feedback: ${answer}`);
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    rl.close();
  }
})();

const rl = readline.createInterface({ input, output });
rl.question("What do you think about node.js")
  .then((answer) => {
    console.log(`Thank you for your valuable advice via promises: ${answer}`);
  })
  .catch((err) => {
    console.log("Error: ", err);
  })
  .finally(() => {
    rl.close();
  });

(async () => {
  await new Promise((resolve) => {
    const rl1 = readlineSync.createInterface({ input, output });
    rl1.question("callback", (answer) => {
      console.log(answer);
      rl1.close();
      resolve();
    });
  });
})();
