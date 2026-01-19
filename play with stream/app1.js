const { Readable, Writable } = require("stream");
const readline = require("readline");
const { TextDecoderStream } = require("stream/web");

async function fetchResponseBody(url) {
  const response = await fetch(url);

  if (!response.ok)
    throw new Error(`HTTP Error: ${response.status} : ${response.statusText}`);

  return response.body;
}

function createLineReader(webstream) {
  const utf8Stream = Readable.fromWeb(
    webstream.pipeThrough(new TextDecoderStream("utf8")),
    {
      highWaterMark: 16 * 1024,
    },
  );
  return {
    utf8Stream,
    rl: readline.createInterface({ input: utf8Stream }),
  };
}

(async () => {
  const url = "http://norvig.com/big.txt";
  const responseBody = await fetchResponseBody(url);

  const { utf8Stream, rl } = createLineReader(responseBody);
  const slowWritable = new Writable({
    write(chunk, encoding, callback) {
      setTimeout(() => {
        process.stdout.write(chunk);
        callback();
      }, 100);
    },
  });

  for await (const line of rl) {
    const canWrite = slowWritable.write(line + "\n");
    if (!canWrite) {
      console.log(`Writable buffer full -> pausing readable`);
      utf8Stream.pause();

      await new Promise((resolve) => {
        slowWritable.once("drain", () => {
          console.log("Drain fired - resuming readable");
          utf8Stream.resume();
          resolve();
        });
      });
    }
  }
  slowWritable.end();
})();

// async function fetchResponseBody(url) {
//   const response = await fetch(url);
//   if (!response.ok)
//     throw new Error(`HTTP ${response.status} : ${response.statusText}`);
//   return response.body;
// }

// function createLineReader(webstream) {
//   const utf8Stream = Readable.fromWeb(
//     webstream.pipeThrough(new TextDecoderStream("utf8")),
//     {
//       highWaterMark: 16 * 1024,
//     }
//   );

//   return {
//     utf8Stream,
//     rl: readline.createInterface({
//       input: utf8Stream,
//       crlfDelay: Infinity,
//     }),
//   };
// }

// (async () => {
//   const response = await fetchResponseBody(url);
//   const { utf8Stream, rl } = createLineReader(response);

//   for await (const line of rl) {
//     console.log(line);
//     utf8Stream.pause();
//   }
// })();



// const { Readable, Writable } = require("stream");
// const readline = require("readline");

// async function fetchResponseBody(url) {
//   const response = await fetch(url);
//   if (!response.ok)
//     throw new Error(`HTTP ${response.status} : ${response.statusText}`);
//   return response.body;
// }

// function createLineReader(webstream) {
//   const utf8Stream = Readable.fromWeb(
//     webstream.pipeThrough(new TextDecoderStream("utf8")),
//     {
//       highWaterMark: 16 * 1024,
//     }
//   );

//   return {
//     utf8Stream,
//     rl: readline.createInterface({
//       input: utf8Stream,
//       crlfDelay: Infinity,
//     }),
//   };
// }

// (async () => {
//   const response = await fetchResponseBody(url);
//   const { utf8Stream, rl } = createLineReader(response);
//   const slowWritable = new Writable({
//     highWaterMark: 16 * 1024,
//     write(chunk, encoding, callback) {
//       setTimeout(() => {
//         process.stdout.write(chunk);
//         callback();
//       }, 2000);
//     },
//   });

//   for await (const line of rl) {
//     // console.log(line);
//     // utf8Stream.pause();
//     const canWrite = slowWritable.write(line + "\n");
//     if (!canWrite) {
//       console.log("Writable buffer full pausing readable");
//       utf8Stream.pause();
//       await new Promise((resolve) => {
//         slowWritable.once("drain", () => {
//           console.log("Drain fired resuming readable");
//           utf8Stream.resume();
//           resolve();
//         });
//       });
//     }
//   }
//   slowWritable.end();
// })();
