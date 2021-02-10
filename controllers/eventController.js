const { Event } = require("../db/models");
const { Op } = require("sequelize");
const { sequelize } = require("sequelize");

exports.eventList = async (req, res) => {
  try {
    const events = await Event.findAll({
      attributes: ["id", "name", "image"],
      // where: { startDate: { [Op.lte]: 10 } },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventDetail = async (req, res) => {
  const { eventId } = req.params;
  try {
    const foundEvent = await Event.findByPk(eventId, {
      attributes: ["id", "name", "image"],
    });
    foundEvent
      ? res.json(foundEvent)
      : res.status(404).json({ message: "No such event found!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventCreate = async (req, res) => {
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
      res.status(500).json({ message: "Please make sure your input is valid" });
    else res.status(500).json({ message: error.message });
  }
};

exports.eventUpdate = async (req, res) => {
  const { eventId } = req.params;

  try {
    const foundEvent = await Event.findByPk(eventId);
    foundEvent
      ? (await foundEvent.update(req.body), res.status(204).end())
      : res.status(404).json({ message: "No such event found to be updated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventDelete = async (req, res) => {
  try {
    await Event.destroy({ where: { id: req.body } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventName = async (req, res) => {
  try {
    const foundEvent = await Event.findAll({ where: { name: req.body } });
    foundEvent
      ? res.json(foundEvent)
      : res.status(404).json({ message: "No such event found!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventFull = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        numOfSeats: {
          [Op.eq]: Op.col("bookedSeats"),
        },
      },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [Op.eq]: sequelize.fn("upper", sequelize.col("bookSeats")),
