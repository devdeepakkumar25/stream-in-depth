const http = require("node:http");

const server = http.createServer((req, res) => {
  let body = "";

  req.setEncoding("utf8");

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      //   res.write(typeof data);
      res.end(
        JSON.stringify({
          type: typeof data,
          receivedData: data,
        })
      );
    } catch (er) {
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});

server.listen(1337, () => {
  console.log("Server is listening on port : 1337");
});
