require("dotenv").config();
const express = require("express");
const path = require("path");
//parsers
const cookieParser = require("cookie-parser");
const cors = require("cors");
//routers
const artRouter = require("./routes/searchArtworks");
const usernamerRouter = require("./routes/usernameRouter");
const userController = require("./controllers/userController");
const tokenController = require("./controllers/tokenController");
const collectionsController = require("./controllers/collectionsController");

const app = express();
const port = process.env.PORT || 3000;

//parse all req body info
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//able to read cookies as object
app.use(cookieParser());
app.use(cors());

app.use("/:user", usernamerRouter);

//route to handle user sign-up/login
app.get("/signup", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/users/signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/users/login.html"));
});

app.post("/signup", userController.createUser);
app.post("/login", userController.verifyUser, tokenController.assignToken);

//route to logout user
app.use("/logout", tokenController.clearCookie, (req, res) => {
  res.status(200).json("User has been logged out!");
});

//route for any searches for specific artworks
app.use("/search", artRouter);

app.get("*", function (req, res) {
  console.error(" 404 page - ", req.url, req.method, req.body);
  res.send(
    JSON.stringify({
      status: 0,
      message: "Invalid link",
      url: req.url,
      method: req.method,
      requestBody: req.body,
    })
  );
});

//ROUTE TO SERVE HOMEPAGE
app.use("/dist", express.static(path.join(__dirname, "../dist")));
// serve index.html on the route '/'
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

app.all("*", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An unknown error occured" },
  };
  const errObj = Object.assign(defaultErr, err);
  res.status(errObj.status).send(errObj.message);
});

//make sure app is listening on some type of port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
