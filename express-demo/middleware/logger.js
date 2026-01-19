function log(req, res, next) {
  console.log("Logging...");
  next();
}

// module.exports.log = log;
module.exports = log;
