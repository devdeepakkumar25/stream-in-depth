async function streamText() {
  const output = document.getElementById("output");
  output.textContent = "";

  try {
    const response = await fetch("http://localhost:3000/stream");
    if (!response.ok) {
      throw new Error("HTTP Error " + response.status);
    }
    const reader = response.body.getReader();

    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const text = decoder.decode(value, { stream: true });
      output.textContent += text;

      console.log("Chunk Received: ", text);
    }
    output.textContent += decoder.decode();
  } catch (error) {
    console.log("Streaming failed: ", error.message);
    output.textContent = "Error while streaming";
  }
}

streamText();
