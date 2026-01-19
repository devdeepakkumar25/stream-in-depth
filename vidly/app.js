const http = require("http");

const SOURCE_URL = "https://norvig.com/big.txt";

http
  .createServer(async (req, res) => {
    if (req.url !== "/") {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Not Found");
    }

    try {
      const response = await fetch(SOURCE_URL);

      // ---------- HEADERS ----------
      res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      });

      // ---------- UTF-8 DECODER / ENCODER ----------
      const decoder = new TextDecoder("utf-8");
      const encoder = new TextEncoder();

      // ---------- TRANSFORM STREAM ----------
      const upperCaseTransform = new TransformStream({
        transform(chunk, controller) {
          // bytes → string (safe UTF-8 streaming)
          const text = decoder.decode(chunk, { stream: true });

          // string transform
          const upper = text.toUpperCase();

          // string → bytes
          controller.enqueue(encoder.encode(upper));
        },

        flush(controller) {
          // flush remaining decoder state
          const remaining = decoder.decode();
          if (remaining) {
            controller.enqueue(encoder.encode(remaining.toUpperCase()));
          }
        },
      });

      // ---------- PIPE FETCH → TRANSFORM → RESPONSE ----------
      const reader = response.body.pipeThrough(upperCaseTransform).getReader();

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          res.end();
          break;
        }

        // value is Uint8Array
        res.write(value);
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    }
  })
  .listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
  });
