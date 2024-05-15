const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Define the port that the server will listen on.
const port = 3000;

// Create a new Express app.
const app = express();

// Configure body parser to parse the request body as JSON.
app.use(bodyParser.json());

// Enable CORS to allow requests from any origin.
app.use(cors());

// Connect to the database.
mongoose.connect("mongodb://localhost:27017/mydatabase");

// Create a new route for the `/users` endpoint.
app.get("/users", (req, res) => {
  // Get all of the users from the database.
  const users = mongoose.model("User").find({}).toArray();

  // Send the users back to the client.
  res.send(users);
});

// Create a new route for the `/users/:id` endpoint.
app.get("/users/:id", (req, res) => {
  // Get the user with the specified ID from the database.
  const user = mongoose.model("User").findOne({ id: req.params.id });

  // Send the user back to the client.
  res.send(user);
});

// Create a new route for the `/users` endpoint.
app.post("/users", (req, res) => {
  // Create a new user from the request body.
  const user = new mongoose.model("User", req.body);

  // Save the user to the database.
  user.save();

  // Send the user back to the client.
  res.send(user);
});

// Create a new route for the `/users/:id` endpoint.
app.put("/users/:id", (req, res) => {
  // Update the user with the specified ID from the database.
  const user = mongoose.model("User").findOne({ id: req.params.id });

  // Update the user's data with the data from the request body.
  user.name = req.body.name;
  user.email = req.body.email;

  // Save the user to the database.
  user.save();

  // Send the user back to the client.
  res.send(user);
});

// Create a new route for the `/users/:id` endpoint.
app.delete("/users/:id", (req, res) => {
  // Delete the user with the specified ID from the database.
  const user = mongoose.model("User").findOne({ id: req.params.id });

  // Delete the user.
  user.remove();

  // Send a 200 OK response to the client.
  res.sendStatus(200);
});

// Start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


