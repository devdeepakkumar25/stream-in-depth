const { Readable } = require("stream");
const readline = require("readline");

async function fetchSlowStreamWithReadline(url, timeoutMs = 15000) {
  const abortController = new AbortController();
  const { signal } = abortController;

  // Timeout abort
  const timeoutId = setTimeout(() => {
    console.log("⏱️ Client timeout – aborting fetch");
    abortController.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    console.log("✅ Connected, status:", response.status);

    /**
     * Convert Web ReadableStream → Node Readable stream
     * fetch() automatically handles gzip decompression
     */
    const nodeReadable = Readable.fromWeb(response.body);
    nodeReadable.setEncoding("utf8"); // important for readline

    /**
     * readline interface (line-by-line)
     */
    const rl = readline.createInterface({
      input: nodeReadable,
      crlfDelay: Infinity,
    });

    // Read each line as it arrives
    for await (const line of rl) {
      console.log(line);
    }

    console.log("✅ Stream completed");
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("⚠️ Fetch aborted");
    } else {
      console.error("❌ Fetch error:", err.message);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

// fetchSlowStreamWithReadline(url, timeoutMs = 15000)
fetchSlowStreamWithReadline("http://localhost:3000", 200000);
