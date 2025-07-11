const express = require("express");
const app = express();
const port = 4000;
const ejs = require("ejs");
// const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://agbajeabiodunkay:CbXbrl4HBZcJL06s@cluster0.acphhz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//FOR EJS
app.set("view engine", "ejs");

// FOR HTML FILE
app.get("/html", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

//TESTING FOR SIGNUP FORM
app.post("/signup", (request, response) => {
  console.log(request.body);
  const newUser = new User(request.body);
  newUser
    .save()
    .then(() => {
      console.log("User saved succesfully");
      response.redirect("login");
    })

    .catch((err) => {
      console.error("Error saving user:", err);
      response.status(500).send(`Error saving user: ${err.message}`);
    });
});

//TESTING FOR LOGIN FORM
app.post("/login", (request, response) => {
  const userData = {
    username: request.body.username,
    password: request.body.password,
  };
  console.log(userData);
  User.findOne({ username: userData.username }).then((user) => {
    console.log(user);
    if (!user || user == null) {
      return response.status(404).send("User not found");
    } else {
      if (user.password == userData.password) {
        response.redirect("dashboard");
      } else {
        response.status(401).send(`Incorrect Password`);
      }
    }
  });
});

app.get("/index", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/signup", (request, response) => {
  response.render("signup");
});

app.get("/login", (request, response) => {
  response.render("login");
});

app.get("/dashboard", (request, response) => {
  response.render("dashboard");
});

// FOR EJS
app.get("/ejs", (req, res) => {
  // res.render("index");
  res.render("index", {});
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

const connection = mongoose.connect(uri);

connection
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error connecting to mongodb");
  });
