const express = require("express");
const sequelize = require("./config/database");

const app = express();

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection succeeded.");
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

app.listen(3000, () => {
    console.log("Server is running...");
});