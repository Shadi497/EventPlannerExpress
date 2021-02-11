const { Event } = require("../db/models");
const { Op } = require("sequelize");
const { sequelize } = require("sequelize");

// const fetchEvent = (eventId, next);

exports.eventList = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      attributes: ["id", "name", "image"],
      order: [
        ["startDate", "ASC"],
        ["name", "ASC"],
      ],
    });
    res.status(200).json(events);
    // }
  } catch (error) {
    next(error);
  }
};

exports.eventDetail = async (req, res, next) => {
  const { eventId } = req.params;
  const ev = parseInt(eventId);
  try {
    const foundEvent = await Event.findByPk(ev, {
      attributes: ["id", "name", "image"],
    });
    if (foundEvent) res.json(foundEvent);
    else next({ status: 404, message: "No such event found!" });
  } catch (error) {
    next(error);
  }
};

exports.eventName = async (req, res, next) => {
  const { eventName } = req.params;
  console.log(typeof eventName);
  try {
    const foundEvent = await Event.findAll({ where: { name: "eventName" } });
    console.log(foundEvent);
    foundEvent
      ? res.json(foundEvent)
      : next({
          status: 404,
          message: "No such event found with name provided!",
        });
  } catch (error) {
    next(error);
  }
};

exports.eventCreate = async (req, res, next) => {
  try {
    if (Array.isArray(req.body)) {
      const newEvent = await Event.bulkCreate(req.body, { validate: true });
      res.status(201).json(newEvent);
    } else {
      const newEvent = await Event.create(req.body);
      res.status(201).json(newEvent);
    }
  } catch (error) {
    if (error.message === "")
      next({ status: 500, message: "Please make sure your input is valid" });
    else next({ status: 500, message: error.message });
  }
};

exports.eventUpdate = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const foundEvent = await Event.findByPk(eventId);
    foundEvent
      ? (await foundEvent.update(req.body), res.status(204).end())
      : next({ status: 404, message: "No such event found to be updated!" });
  } catch (error) {
    next(error);
  }
};

exports.eventDelete = async (req, res, next) => {
  try {
    const foundEvent = await Event.findAll({ where: { id: req.body } });
    foundEvent.length > 0
      ? (await Event.destroy({ where: { id: req.body } }),
        res.status(204).end())
      : next({ status: 404, message: "No such event found to be deleted!" });
  } catch (error) {
    next(error);
  }
};

exports.eventFull = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        numOfSeats: {
          [Op.col]: "Event.bookedSeats",
        },
      },
    });
    events
      ? res.json(events)
      : next({ status: 404, message: "No such event found!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
