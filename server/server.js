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
//cookie controllers
// const cookieController = require('./controllers/cookieController');
// const sessionController = require('./controllers/sessionController');

const app = express();
const port = process.env.PORT || 3000;

//parse all req body info
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//able to read cookies as object
app.use(cookieParser());
app.use(cors());

//ONCE USER HAS LOGGED IN/SIGNUP
//need to have a redirect for user dashboard (will just be the username)
//here we will have router to handle favorites and collections
//source for postman testing
//https://community.postman.com/t/what-is-api-paths/21818/2
app.use("/:username", usernamerRouter);

//route to handle user sign-up/login
app.get("/signup", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/users/signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/users/login.html"));
});

app.post("/signup", userController.createUser);
app.post("/login", userController.verifyUser);

//LOGIN WITH COOKIES, go back and work on if we have some time!
// app.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
//   return res.redirect('/dashboard');
// });
// // /**
// // * login
// // */
// app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
//   return res.redirect('/dashboard');
// });

//route for any searches for specific artworks
app.use("/search", artRouter);

//ROUTE TO SERVE HOMEPAGE
app.use("/dist", express.static(path.join(__dirname, "../dist")));
// serve index.html on the route '/'
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

//catch all route handler for any requests made to unknown routes
// app.all('*', (req, res) => res.sendStatus(404));

//FOLLOWING LINK EXPLAINS WHY I MUST SET UP CATCH ALL THIS WAY
//https://ui.dev/react-router-cannot-get-url-refresh
app.all("*", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An unknown error occured" },
  };
  const errObj = Object.assign(defaultErr, err);
  res.status(errObj.status).send(errObj.message);
});

//make sure app is listening on some type of port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
