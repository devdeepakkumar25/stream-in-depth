const { Readable } = require("stream");

class NumberStream extends Readable {
  constructor(options) {
    super(options);
    this.current = 1;
  }
  _read() {
    const num = this.current++;
    if (num > 5) {
      this.push(null);
    } else {
      const str = num.toString() + "\n";
      this.push(str);
    }
  }
}

const stream = new NumberStream();
stream.pipe(process.stdout);
