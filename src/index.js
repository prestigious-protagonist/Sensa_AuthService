require('dotenv').config();

const express = require("express");
const app = express();
const { PORT, DB_SYNC } = require("./config/serverConfig");
const { sequelize } = require("./models/index");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
const apiRouter = require("./routes/index");
app.use("/authService/api", apiRouter); // All routes start from "/api"
app.get('/', (req, res)=> {res.send("You are hitting the auth Service.")})
// Basic route for testing
app.get("/authService/api/v1/home", (req, res) => {
  res.send("Hello from Auth Service");
});

// Start server
app.listen(PORT, async() => {
  

  console.log(`Auth Service running on port: ${PORT}`);
});

module.exports = app;
