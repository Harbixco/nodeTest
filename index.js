const express = require("express");
const app = express();
const port = 4000;
// const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://agbajeabiodunkay:CbXbrl4HBZcJL06s@cluster0.acphhz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(express.json());

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.post("/signup", (request, response) => {
  console.log(request.body);
  const newUser = new User(request.body);
  newUser
    .save()
    .then(() => {
      console.log("User saved succesfully");
      response.send("User saved succesfully");
    })

    .catch((err) => {
      console.error("Error saving user:", err);
      response.status(500).send(`Error saving user: ${err.message}`);
    });
});

app.post("/login", (request, response) => {
  const userData = {
    username: request.body.username,
    password: request.body.password,
  };
  console.log(userData);
  const foundUser = User.findOne({ username: userData.username }).then(
    (user) => {
      console.log(user);
      if (!user || user == null) {
        return response.status(404).send("User not found");
      }
    }
  );
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
