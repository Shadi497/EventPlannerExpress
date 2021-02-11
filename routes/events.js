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
//fully booked list
router.get("/full", eventFull);
//list
router.get("/", eventList);
// // Name Detail
// router.get("/:eventName", eventName);

//delete
router.delete("/", eventDelete);
//detail
router.get("/:eventId", eventDetail);
//update
router.put("/:eventId", eventUpdate);

module.exports = router;
