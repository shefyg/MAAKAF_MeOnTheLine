import express from "express";
const router = express.Router();

router.use(logger2);

router.get("/", (req, res) => {
  console.log(JSON.stringify(req.user, null, 4));
  res.send("Cards List");
});

router.get("/new", (req, res) => {
  // res.send("User New Form");
  res.render("cards/new", { firstName: "test" });
});

router.post("/", (req, res) => {
  const isValid = true;
  const uname = req.body.firstName;
  if (isValid) {
    users.push({ firstName: req.body.firstName });
    res.redirect(`/cards/${users.length - 1}`);
  } else {
    res.render("cards/new", { firstName: uname });
  }
});

// ATTENTION: Always put static route above dynamic routes
//           it is because the order of the routes is important. Wiil use the first route
//           that matches the request.

// Alld routes in a row for the same basic endpoint different request types
router
  .route("/:id")
  .get((req, res) => {
    console.log(req.card);
    res.send(`Card Details ${req.card}`);
  })
  .put((req, res) => {
    res.send(`Update Card Details ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete Card Details ${req.params.id}`);
  });

// handling param with param middleware
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  console.log("Card ID is", id);
  next();
});

function logger2(req, res, next) {
  console.log(`Logging 2... request ${req.originalUrl}`);
  next();
}

const cardsRouter = router;
export default cardsRouter;
