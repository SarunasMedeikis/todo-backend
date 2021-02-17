const Post = require("../models/post.model");
const User = require("../models/user.model");
//  Post Model
// author: String,
// title: String,
// date: String,
// completed: Boolean,
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/authentication");

router.get("/todos", authentication, (req, res) => {
  Post.find({ "author.id": req.user.id })
    .then((todos) => res.status(200).send(todos))
    .catch((e) => res.status(400).send(`Error getting todos: ${e}`));
});

router.post("/create", authentication, (req, res) => {
  const newTodo = new Post(req.body);
  newTodo.author.id = req.user.id;
  console.log(req.user);
  newTodo
    .save()
    .then(() => res.status(200).send("Todo created succesfully"))
    .catch((e) => res.status(400).send(`Error creating todo: ${e}`));
});

router.post("/update", authentication, (req, res) => {
  //Update receives ID of the todo, to update.
  const update = { title: req.body.title, completed: req.body.completed };
  Post.findOneAndUpdate({ _id: req.body.id }, update, { new: true })
    .then((doc) => res.status(200).send(doc))
    .catch((e) => res.status(400).send(`Error updating todo: ${e}`));
});

router.post("/delete", authentication, (req, res) => {
  //Delete receives ID of the todo, to delete.
  Post.findOneAndDelete({ _id: req.body.id })
    .then(() => res.status(200).send("Succesfully deleted todo"))
    .catch((e) => res.status(400).send(`Error deleting todo: ${e}`));
});
module.exports = router;
