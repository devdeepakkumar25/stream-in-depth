const outputDiv = document.getElementById("output");

// 🔄 TransformStream: converts text to uppercase
const upperCaseTransform = new TransformStream({
  start() {
    console.log("Transform stream started");
    outputDiv.innerHTML += "Transform stream started<br>";
  },

  transform(chunk, controller) {
    const transformedChunk = chunk.toUpperCase();

    controller.enqueue(transformedChunk);

    outputDiv.innerHTML += `Input: ${chunk} → Output: ${transformedChunk}<br>`;
  },

  flush() {
    console.log("Transform stream ended");
    outputDiv.innerHTML += "<strong>Transform stream closed</strong><br>";
  },
});

// 📥 ReadableStream: source of data
const readable = new ReadableStream({
  start(controller) {
    controller.enqueue("hello");
    controller.enqueue("world");
    controller.close();
  },
});

// 📤 WritableStream: receives transformed data
const writable = new WritableStream({
  write(chunk) {
    console.log("Final output:", chunk);
    outputDiv.innerHTML += `<strong>Written:</strong> ${chunk}<br>`;
  },
});

// 🔗 Pipeline: Readable → Transform → Writable
// readable.pipeThrough(upperCaseTransform).pipeTo(writable);

const encoder = new TextEncoderStream();
const decoder = new TextDecoderStream();
// readable.pipeThrough(encoder).pipeTo(writable);
readable.pipeThrough(encoder).pipeThrough(decoder).pipeTo(writable);
