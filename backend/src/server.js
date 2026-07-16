const sequelize = require("./config/database");

require("./models/Student");

const app = require("./app");

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected.");

        return sequelize.sync();
    })
    .then(() => {
        console.log("Database synchronized.");
    })
    .catch((err) => {
        console.error("Database error:", err);
    });

app.listen(3000, () => {
    console.log("Server is running...");
});