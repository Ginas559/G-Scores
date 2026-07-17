const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const reportRoutes = require("./routes/reportRoutes");

const topRoutes = require("./routes/topRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/students", studentRoutes);

app.use("/report", reportRoutes);

app.use("/top10", topRoutes);

module.exports = app;