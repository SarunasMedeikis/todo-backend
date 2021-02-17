const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 5000;

//To be able to read req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROUTES
const userRoutes = require("./routes/user.routes");

//Connect mongodb
mongoose.connect(process.env.MONGODB_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connected!");
});

//Express routes!
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
