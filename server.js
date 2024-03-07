const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Request received");
  res.status(500).json({ message: "Server error" });
  res.send("Hi there! 2");
});

app.listen(3000);
