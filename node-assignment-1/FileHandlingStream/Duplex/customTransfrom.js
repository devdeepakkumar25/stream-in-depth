const fs = require("node:fs");
const fsp = require("node:fs/promises");
const { Transform, pipeline } = require("node:stream");

class EncryptStream extends Transform {
  constructor(shift = 1) {
    super();
    this.shift = shift;
  }

  // Called for every chunk
  _transform(chunk, encoding, callback) {
    const encrypted = Buffer.alloc(chunk.length);

    for (let i = 0; i < chunk.length; i++) {
      encrypted[i] = chunk[i] + this.shift;
    }

    callback(null, encrypted); // push encrypted data
  }
}

class DecryptStream extends Transform {
  _transform(chunk, enc, cb) {
    const decrypted = Buffer.alloc(chunk.length);
    for (let i = 0; i < chunk.length; i++) {
      decrypted[i] = chunk[i] - 1;
    }
    cb(null, decrypted);
  }
}

const encryptFile = async () => {
  const readHandle = await fsp.open("password.txt", "r");
  const writeHandle = await fsp.open("encryptedPassword.txt", "w");

  const readStream = readHandle.createReadStream();
  const writeStream = writeHandle.createWriteStream();
  const encryptStream = new EncryptStream(1);

  pipeline(readStream, encryptStream, writeStream, async (err) => {
    await readHandle.close();
    await writeHandle.close();

    if (err) {
      console.error("Encryption failed:", err);
    } else {
      console.log("Password encrypted successfully");
    }
  });
};

encryptFile();
