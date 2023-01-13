// DEPENDENCIES

const express = require("express");
const cors = require("cors");
const userController = require("./controllers/userController");
const userEstablishmentsController = require("./controllers/userEstablishmentsController");
const alcoholController = require("./controllers/alcoholController");
const barsController = require("./controllers/barsController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/users", userController);
app.use("/userestablishments", userEstablishmentsController);
app.use("/alcohols", alcoholController);
app.use("/bars", barsController);

// ROUTES
app.get("/", (req, res) => {
  res.send(`<style>
    body {color: white; background: #00296b;}
    a {color: #fdc500;}
    h1 {text-align:center; font-family: 'Helvetica', 'Arial', sans-serif; margin: 0px;}
    .shotglass {font-size: 100px;}
    </style>
    <h1 class="shotglass">🥃</h1>
    <h1>Welcome to the <a href="https://worthashot.scheiber.dev/">Worth a Shot</a> Backend!</h1>
    <p style="text-align:center; font-family: 'Helvetica', 'Arial', sans-serif;"><a href="https://github.com/Scheiber/worthashot">Find out more.</a></p>`);
});

app.get("*", (req, res) => {
  res.status(404).send("Not found!");
});

// EXPORT
module.exports = app;
