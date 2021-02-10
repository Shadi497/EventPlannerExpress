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

//fully booked list
router.get("/full", eventFull);

//detail
router.get("/:eventId", eventDetail);
//update
router.put("/:eventId", eventUpdate);

//Name Detail
router.get("/", eventName);
//list
router.get("/", eventList);
//create
router.post("/", eventCreate);

//delete
router.delete("/", eventDelete);

module.exports = router;
