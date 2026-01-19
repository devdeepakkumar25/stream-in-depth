/**
 * Dynamic Node.js file upload server
 * Saves allowed file types using streams
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

// ---- CONFIG ----
const uploadDir = path.join(__dirname, "uploads");
const allowedExtensions = ["png", "jpg", "jpeg", "pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const server = http.createServer((req, res) => {
  // ---- CORS HEADERS ----
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Disposition"
  );

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // ---- FILE UPLOAD ROUTE ----
  if (req.method === "POST" && req.url === "/upload") {
    const disposition = req.headers["content-disposition"];

    if (!disposition || !disposition.includes("filename=")) {
      res.writeHead(400);
      return res.end("Missing filename");
    }

    // ---- Extract & sanitize filename ----
    const originalName = disposition.split("filename=")[1].replace(/"/g, "");

    const filename = path.basename(originalName);

    // ---- Extension validation ----
    const extension = path.extname(filename).slice(1).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      res.writeHead(400);
      return res.end("Invalid file type");
    }

    const filePath = path.join(uploadDir, filename);
    const fileStream = fs.createWriteStream(filePath);

    let uploadedSize = 0;

    // ---- Size check (stream-safe) ----
    req.on("data", (chunk) => {
      uploadedSize += chunk.length;

      if (uploadedSize > MAX_FILE_SIZE) {
        fileStream.destroy();
        fs.unlink(filePath, () => {}); // remove partial file

        res.writeHead(413);
        res.end("File size exceeds limit");
        req.destroy();
      }
    });

    // ---- Pipe stream ----
    req.pipe(fileStream);

    fileStream.on("finish", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("File uploaded successfully");
    });

    fileStream.on("error", (err) => {
      console.error("File write error:", err);
      res.writeHead(500);
      res.end("File save failed");
    });

    req.on("error", (err) => {
      console.error("Request error:", err);
      res.writeHead(500);
      res.end("Upload failed");
    });

    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

// ---- START SERVER ----
server.listen(3001, () => {
  console.log("Server running at http://localhost:3001/upload");
});

// /**
//  * Dynamic Node.js file upload server
//  * Saves ANY file type using streams
//  */

// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// // Ensure upload directory exists
// const uploadDir = path.join(__dirname, "uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const server = http.createServer((req, res) => {
//   // ---- CORS HEADERS ----
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Content-Disposition"
//   );

//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     return res.end();
//   }

//   // ---- FILE UPLOAD ROUTE ----
//   if (req.method === "POST" && req.url === "/upload") {
//     const disposition = req.headers["content-disposition"];

//     if (!disposition || !disposition.includes("filename=")) {
//       res.writeHead(400);
//       return res.end("Missing filename");
//     }

//     // Extract filename safely
//     const filename = path.basename(
//       disposition.split("filename=")[1].replace(/"/g, "")
//     );

//     const filePath = path.join(uploadDir, filename);

//     const fileStream = fs.createWriteStream(filePath);

//     // Pipe request stream directly into file
//     req.pipe(fileStream);

//     fileStream.on("finish", () => {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("File uploaded successfully");
//     });

//     fileStream.on("error", (err) => {
//       console.error("File write error:", err);
//       res.writeHead(500);
//       res.end("File save failed");
//     });

//     req.on("error", (err) => {
//       console.error("Request error:", err);
//       res.writeHead(500);
//       res.end("Upload failed");
//     });

//     return;
//   }

//   res.writeHead(404, { "Content-Type": "text/plain" });
//   res.end("Not Found");
// });

// // ---- START SERVER ----
// server.listen(3001, () => {
//   console.log("Server running at http://localhost:3001/upload");
// });
