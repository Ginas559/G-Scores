const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/students", studentRoutes);

app.use("/report", reportRoutes);

module.exports = app;