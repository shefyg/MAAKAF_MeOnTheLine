// 4/4/2024 - add support for db sqlite

import sqlite3 from "sqlite3";
import express from "express";
import usersRouter from "./routes/users.js";
import cardsRouter from "./routes/cardsRouter.js";

import CardController from "./controllers/cardsController.js";
import path from "path";

// If your script is in the same directory as the cards.db
const dbPath = path.resolve(process.cwd(), "cards.db");

const cardsController = new CardController(dbPath);

cardsController.queryAll();

const app = express();

// using the public path
app.use(express.static("public"));
// to get data  from request
app.use(express.urlencoded({ extended: true }));
// this is from the body
app.use(express.json());
app.set("view engine", "ejs");

//app.use(logger); // have to put the middleware before the route

// running the logger only on specific request
// we can run few middlewares as params before handling the request
// we can even put the logger multiple times
app.get("/", logger, (req, res) => {
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

function logger(req, res, next) {
  console.log(`Logging... request ${req.originalUrl}`);
  next();
}

// users router
app.use("/users", usersRouter);

app.listen(3000);
