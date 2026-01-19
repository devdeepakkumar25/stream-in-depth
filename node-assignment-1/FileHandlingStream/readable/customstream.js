const fs = require("fs/promises");

(async () => {
  const srcFile = await fs.open("test.txt", "r");
  const destFile = await fs.open("test-copy.txt", "w");

  let bytesRead = -1;

  while (bytesRead !== 0) {
    const readResult = await srcFile.read();
    console.log(readResult.buffer.length);
    console.log(readResult);
    bytesRead = readResult.bytesRead;

    if (bytesRead !== readResult.buffer.length) {
      const indexNotFilled = readResult.buffer.indexOf(0);

      const newBuffer = Buffer.alloc(indexNotFilled);

      readResult.buffer.copy(newBuffer, 0, 0, indexNotFilled);
      await destFile.write(newBuffer);
    } else {
      await destFile.write(readResult.buffer);
    }
  }
})();
