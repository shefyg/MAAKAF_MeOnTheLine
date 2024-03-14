const express = require("express");
const router = express.Router();

router.use(logger2);

router.get("/", (req, res) => {
  console.log(JSON.stringify(req.user, null, 4));
  res.send("User List");
});

router.get("/new", (req, res) => {
  // res.send("User New Form");
  res.render("users/new", { firstName: "test" });
});

router.post("/", (req, res) => {
  const isValid = true;
  const uname = req.body.firstName;
  if (isValid) {
    users.push({ firstName: req.body.firstName });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    res.render("users/new", { firstName: uname });
  }
});

// ATTENTION: Always put static route above dynamic routes
//           it is because the order of the routes is important. Wiil use the first route
//           that matches the request.

// Alld routes in a row for the same basic endpoint different request types
router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send(`User Details ${req.user}`);
  })
  .put((req, res) => {
    res.send(`Update User Details ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete User Details ${req.params.id}`);
  });

// test data users

const users = [
  { namefirstName: "John" },
  { firstName: "Shefy" },
  { firstName: "Yossi" },
];

// handling param with param middleware
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  console.log("User ID is", id);
  next();
});

function logger2(req, res, next) {
  console.log(`Logging 2... request ${req.originalUrl}`);
  next();
}

module.exports = router;
