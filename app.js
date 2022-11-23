const e = require("express");
const express = require("express");

const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

let user = {
  id: "bbjdbsjwj",
  email: "hai@gmail.com",
  password: "efewjnejwf",
};

const JWT_SECRET = "some super secret...";

app.get("/", (req, res) => {
  res.send("Helloooo");
});
app.get("/forgot-password", (req, res, next) => {
  res.render("forgot-password");
});
app.post("/forgot-password", (req, res, next) => {
  const { email } = req.body;
  //res.send(email);
  if (email !== user.email) {
    res.send("user not registered");
    return;
  }
  //create otp for 2mins
  const secret = JWT_SECRET + user.password;
  const payload = {
    email: user.email,
    id: user.id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "2m" });
  const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
  console.log(link);
  res.send("password reset link sent to ur email");
});
app.get("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  //res.send(req.params);
  //check id exist in db
  if (id !== user.id) {
    res.send("invalid id");
    return;
  }
  //we have a valid id,we have a valid user with this id
  const secret = JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});
app.post("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  const { password, password2 } = req.body;
  //res.send(user);
  if (id !== user.id) {
    res.send("invalid id");
    return;
  }
  const secret = JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    //validate password and password2 should match
    //we can simply find the user with the payload email and id
    user.password = password;
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

app.listen(3000, () => {
  console.log(" http://localhost:3000");
});
