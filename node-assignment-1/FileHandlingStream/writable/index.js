// const fs = require("fs");
const fs = require("node:fs/promises");

// (async () => {
//   console.time("WriteMore");
//   const fileHandle = await fs.open("test.txt", "w");
//   for (let i = 0; i < 30000; i++) {
//     await fileHandle.write(` ${i} `);
//   }
//   console.timeEnd("WriteMore");
// })();'

// (async () => {
//   console.time("writeMore");

//   fs.open("test.txt", "w", (err, fd) => {
//     for (let i = 0; i < 500000; i++) {
//       fs.write(fd, ` ${i} `, () => {});
//     }
//   });
//   console.timeEnd("WriteMore");
// })();

// (() => {
//   console.time("writeMore");

//   fs.open("test.txt", "w", (err, fd) => {
//     for (let i = 0; i < 50000; i++) {
//       const buff = Buffer.from(` ${i} `);
//       fs.writeSync(fd, buff);
//     }
//   });
//   console.timeEnd("writeMore");
// })();

// (async () => {
//   console.time("writeMore");

//   const fileHandle = await fs.open("test.txt", "w");
//   const stream = fileHandle.createWriteStream();
//   console.log(stream.writableHighWaterMark);
//   const buff = Buffer.from(" deepak ");
//   stream.write(buff);
//   stream.write(buff);

//   stream.write(buff);

//   stream.write(buff);

//   console.log(buff);
//   console.log(stream.writableLength);

//   // for (let i = 0; i < 5000000; i++) {
//   //   const buffer = Buffer.from(` ${i} `);
//   //   stream.write(buffer);
//   // }
//   console.timeEnd("writeMore");
// })();

// (async () => {
//   console.time("writeMore");

//   const fileHandle = await fs.open("test.txt", "w");
//   const stream = fileHandle.createWriteStream();
//   console.log(stream.writableHighWaterMark);
//   const buff = Buffer.alloc(1e8, 10);

//   console.log(buff);
//   console.log(stream.writableLength);

//   await fileHandle.close();

//   console.timeEnd("writeMore");
// })();

// (async () => {
//   console.time("writeMore");

//   const fileHandle = await fs.open("test.txt", "w");
//   const stream = fileHandle.createWriteStream();
//   console.log(stream.writableHighWaterMark);
//   const buff = Buffer.alloc(65584, 10);
//   console.log(stream.write(Buffer.alloc(1, "a")));

//   console.log(buff);
//   console.log(stream.write(buff));
//   console.log(stream.writableLength);
//   await fileHandle.close();

//   console.timeEnd("writeMore");
// })();

// (async () => {
//   console.time("writeMore");

//   const fileHandle = await fs.open("test.txt", "w");
//   const stream = fileHandle.createWriteStream();
//   console.log(stream.writableHighWaterMark);
//   const buff = Buffer.alloc(65584, 10);
//   // console.log(stream.write(Buffer.alloc(1, "a")));

//   console.log(buff);
//   console.log(stream.write(buff));
//   console.log(stream.writableLength);

//   stream.on("drain", () => {
//     console.log(stream.writableLength);
//     const buff = Buffer.alloc(16384, 10);
//     console.log(stream.write(buff));
//     console.log("You are now safe to write more");
//   });

//   // await fileHandle.close();

//   console.timeEnd("writeMore");
// })();

(async () => {
  console.time("writeMore");

  const fileHandle = await fs.open("test.txt", "w");
  // const stream = fileHandle.createWriteStream();
  const stream = fileHandle.createWriteStream({
    highWaterMark: 64 * 1024, // 64 KB
  });

  let i = 0;

  const writeMany = () => {
    while (i < 5000000) {
      const buffer = Buffer.from(` ${i} `);
      i++;
      if (i === 5000000 - 1) {
        return stream.end(buffer);
      }
      if (!stream.write(buffer)) return;
    }
  };

  writeMany();
  let j = 1;
  stream.on("drain", () => {
    console.log(j);
    j++;
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("writeMore");
  });
})();

setInterval(() => {
  const used = process.memoryUsage();
  console.log({
    rss: `${Math.round(used.rss / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)} MB`,
  });
}, 1000);
