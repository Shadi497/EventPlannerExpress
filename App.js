const express = require("express");
const App = express();
const db = require("./db/models");
const eventRoutes = require("./routes/events");

App.use(express.json());
App.use("/events", eventRoutes);

//Not Found
App.use((req, res, next) => {
  // res.status(404).json({ message: "Path not found" });
  next({
    status: 404,
    message: "Path not found",
  });
});

//Error Handling
App.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || "Internal Server Error" });
});

db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

App.listen(8001, () => {
  console.log("Application is running");
});
