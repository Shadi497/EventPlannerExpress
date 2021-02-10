const express = require("express");
const App = express();
const db = require("./db/models");
const eventRoutes = require("./routes/events");

App.use(express.json());
App.use("/events", eventRoutes);

db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

App.listen(8000, () => {
  console.log("Application is running");
});
