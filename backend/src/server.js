const sequelize = require("./config/database");

require("./models/Student");

const app = require("./app");

sequelize
    .authenticate()
    .then(() => {
        return sequelize.sync();
    })
    .then(() => {
    })
    .catch((err) => {
        console.error("Database error:", err);
    });

app.listen(3000, () => {
});