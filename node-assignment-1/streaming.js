const url = "https://norvig.com/big.txt";
(async () => {
  const response = await fetch(url);
  const decoder = new TextDecoder("utf-8");

  const transform = new TransformStream({
    transform(chunk, controller) {
      const text = new TextDecoder().decode(chunk, { strem: true });
      const upper = text.toUpperCase();
      controller.enqueue(new TextEncoder().encode(upper));
    },
  });

  const reader = response.body.pipeThrough(transform).getReader();

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      console.log("Streaming finished");
      break;
    }

    const text = decoder.decode(value, { stream: true });
    console.log("Chunk Received");
    console.log(text);
  }
})();

(async () => {
  const response = await fetch(URL);
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const text = decoder.decode(value, { stream: true });

    const transformed = text.toUpperCase();

    console.log(transformed);
  }
})();

(async () => {
  const response = await fetch(URL);

  const reader = response.body.getReader();

  // Decoder for UTF-8 (IMPORTANT)
  const decoder = new TextDecoder("utf-8");

  while (true) {
    // Read next chunk
    const { value, done } = await reader.read();

    if (done) {
      console.log("✅ Stream finished");
      break;
    }

    // value is Uint8Array (bytes)
    const text = decoder.decode(value, { stream: true });

    console.log("📦 Chunk received:");
    console.log(text);
  }
})();

(async () => {
  const response = await fetch(url);

  const reader = response.body.getReader();

  const decoder = new TextDecoder("utf-8");

  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    let lines = buffer.split("\n");

    buffer = lines.pop();

    for (const line of lines) {
      console.log("Line: ", line);
    }

    if (buffer) {
      console.log("Line", buffer);
    }
  }
})();
