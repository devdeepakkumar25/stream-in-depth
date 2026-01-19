const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "MyExpress", message: "Hello" });
});

module.exports = router;
