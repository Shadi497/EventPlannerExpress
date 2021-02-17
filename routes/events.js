const express = require("express");
const {
  eventCreate,
  eventList,
  eventDetail,
  eventDelete,
  eventUpdate,
  eventFull,
  eventName,
} = require("../controllers/eventController");
const router = express.Router();

//create
router.post("/", eventCreate);
// Name Detail
router.get("/:eventName", eventName);

//list
router.get("/", eventList);

//delete
router.delete("/", eventDelete);
//detail
router.get("/:eventId", eventDetail);
//update
router.put("/:eventId", eventUpdate);

module.exports = router;
