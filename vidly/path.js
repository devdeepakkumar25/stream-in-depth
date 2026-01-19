const path = require("path");
const os = require("os");
const fs = require("fs");

let pathObj = path.parse(__filename);

console.log(pathObj);

console.log(pathObj.base);

console.log(pathObj.ext);
console.log(pathObj.name);

console.log(pathObj.dir);

let totalMemory = os.totalmem();
let freeMemory = os.freemem();

console.log(totalMemory / 1024 ** 3, freeMemory / 1024 ** 3);

function bytesToGB(bytes) {
  return (bytes / 1024 ** 3).toFixed(2);
}

console.log(
  `Total: ${bytesToGB(os.totalmem())} GB, Free: ${bytesToGB(freeMemory)} GB`
);

console.log(process.env);

const files = fs.readdirSync("./");

console.log(files);

const parseFiles = path.parse(files[0]);
console.log(parseFiles);

console.log(parseFiles.root);

files.forEach((file) => {
  const parsed = path.parse(file);
  console.log(parsed);
});

files.forEach((file) => {
  const fullPath = path.join(__dirname, file);
  //   const fullPath = path.parse(__filename, file);
  //   const fullPath = path.parse(__dirname, file);

  if (fs.statSync(fullPath).isFile()) {
    console.log(path.parse(fullPath));
  }
  console.log(fullPath);
});

const extensions = files.map((file) => path.extname(file));

console.log(extensions);

const names = files.map((file) => path.parse(file).name);
console.log(names);

fs.readdir(".#/", function (err, files) {
  if (err) console.error("Error: ", err.message);
  else console.log("Result: ", files);
});
