const outputDiv = document.getElementById("output");

const writableStream = new WritableStream({
  start() {
    console.log("Writable stream started");
    outputDiv.innerHTML += "Stream started<br>";
  },

  write(chunk) {
    console.log("Writing chunk:", chunk);
    outputDiv.innerHTML += `Received: ${chunk}<br>`;
  },

  close() {
    console.log("Stream closed");
    outputDiv.innerHTML += "<strong>Stream closed</strong>";
  },

  abort(error) {
    console.error("Stream aborted:", error);
  },
});

const jsonStream = new WritableStream({
  start() {
    outputDiv.innerHTML += "<strong>JSON Stream Started</strong><br>";
  },

  write(chunk) {
    // chunk is an OBJECT
    console.log("Received object:", chunk);

    // Convert object to formatted JSON
    const formatted = JSON.stringify(chunk, null, 2);

    outputDiv.innerHTML += `
      <pre>${formatted}</pre>
    `;
  },

  close() {
    outputDiv.innerHTML += "<strong>JSON Stream Closed</strong>";
  },

  abort(error) {
    console.error("Stream aborted:", error);
  },
});

async function writeToStream() {
  const writer = writableStream.getWriter();

  await writer.write("Hello");
  await writer.write("World");
  await writer.write("Welcome Deepak");
  await writer.close();
}

writeToStream();

async function writeToJsonStream() {
  const writer = jsonStream.getWriter();

  await writer.write({
    id: 1,
    message: "Hello",
    user: "Deepak",
  });

  await writer.write({
    id: 2,
    message: "World",
    user: "Deepak",
  });

  await writer.write({
    id: 3,
    message: "Welcome Deepak",
    role: "Developer",
  });

  await writer.close();
}

writeToJsonStream();
