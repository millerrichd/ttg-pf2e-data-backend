if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const treasureRouteer = require("./treasure/treasure.router");

var corsOptions = {
  origin: 'TO_SUPPLY',
  methods: [ "GET", "PUT", "POST", "DELETE" ],
  optionsSuccessStatus: 204
}

app.use(express.json());
app.use(cors(corsOptions));

app.use("/treasure", treasureRouteer);

app.use((req, res, next) => {
  next({status: 404, message: `Not found: ${req.originalUrl}`});
});

app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong" } = error;
  res.status(status).json({error: message});
});

module.exports = app;