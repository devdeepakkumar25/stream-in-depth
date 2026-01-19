const { Readable } = require("stream");

class readStream extends Readable {
  constructor(options) {
    super(options);
  }
}

// const stream = new readStream({
//   objectMode: true,
// });

const stream = new Readable({
  objectMode: true,
});
// stream.push(Buffer.from("hello"));
// stream.push(Buffer.from("hello"));
// stream.push(Buffer.from("hello"));
// stream.push(Buffer.from("hello"));
// stream.push(Buffer.from("hello"));
// stream.push(Buffer.from("hello"));

stream.push({ id: "name", name: "Deepak" });
stream.push({ id: "name", name: "Deepak" });
stream.push({ id: "name", name: "Deepak" });
stream.push({ id: "name", name: "Deepak" });

stream.push({ id: "name", name: "Deepak" });

stream.push(null);

stream.on("data", (chunk) => {
  console.log(chunk);
});

stream.on("end", () => {
  console.log("Stream end");
});
