const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("Request received");

  //// status and message:
  //res.status(200).send("Hi there! 3");

  //// download file
  // res.download("server.js");

  //// render template or page
  res.render("CardExamplePage", {
    fullname: "Shefy Gur-Ary",
    title: "Software Developer / Tech Lead",
    email: "shefyg@gmail.com",
    linkedin: "https://www.linkedin.com/in/shefy-gur-ary/",
    phone: "0541234567",
    github: "https://github.com/shefyg",
  });
});

app.listen(3000);
