const { Readable } = require("stream");
const BASE_URL = "https://jsonplaceholder.typicode.com";
const readline = require("readline");
const { parser } = require("stream-json");
const { streamArray } = require("stream-json/streamers/StreamArray");

fetch(`${BASE_URL}/posts`)
  .then((response) => response.json())
  .then((data) => {
    console.log("All posts ", data);
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

async function fetchPosts() {
  const response = await fetch(`${BASE_URL}/posts`);

  const text = await response.text();
  const posts = JSON.parse(text);

  posts.forEach(({ userId, title, body }) => {
    console.log("User:", userId);
    console.log("Title:", title);
    console.log("Body:", body);
    console.log("-------------");
  });
}

fetchPosts().catch(console.error);

fetch(`${BASE_URL}/posts`)
  .then(async (response) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result = "";

    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      if (value) {
        result += decoder.decode(value, { stream: true });
      }
    }

    const posts = JSON.parse(result);

    posts.forEach(({ userId, title, body }) => {
      console.log("User:", userId);
      console.log("Title: ", title);
      console.log("Body: ", body);
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });

fetch(`${BASE_URL}/posts`)
  .then((res) => res.json())
  .then((posts) => {
    posts.forEach(({ userId, title, body }) => {
      console.log(userId, title, body);
    });
  });

fetch(`${BASE_URL}/posts`)
  .then((response) => {
    const nodeStream = Readable.fromWeb(response.body);
    let rawData = "";

    nodeStream.on("data", (chunk) => {
      rawData += chunk.toString();
    });

    nodeStream.on("end", () => {
      const posts = JSON.parse(rawData);
      posts.forEach(({ userId, title, body }) => {
        console.log("UserId: ", userId);
        console.log("Body: ", body);
      });
    });

    nodeStream.on("error", (err) => {
      console.log("Steam Error :", err);
    });
  })
  .catch((err) => {
    console.error(err);
  });

async function fetchStream() {
  const response = await fetch(`${BASE_URL}/comments`);
  const nodeStream = Readable.fromWeb(response.body);

  nodeStream
    .pipe(parser())
    .pipe(streamArray())
    .on("data", ({ value }) => {
      console.log("User:", value.email);
      console.log("Body:", value.body);
      console.log("-------------");
    })
    .on("end", () => {
      console.log("STREAM DONE");
    });
}

fetchStream();
