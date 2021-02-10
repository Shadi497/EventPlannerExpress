const { DATEONLY } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      organizer: { type: DataTypes.STRING, unique: true, max: 20 },
      name: {
        type: DataTypes.STRING,
        validate: {
          sc() {
            if (this.name.includes("event")) {
              throw new Error("You can't add (event) in name");
            }
          },
        },
      },
      email: { type: DataTypes.STRING, notEmpty: true, isEmail: true },
      numOfSeats: {
        type: DataTypes.INTEGER,

        min: 0,
        validate: {
          isPositive(value) {
            if (value < 0) {
              throw new Error("Only positive values are allowed!");
            }
          },
        },
      },
      bookedSeats: {
        type: DataTypes.INTEGER,
        validate: {
          isGreater() {
            if (this.bookedSeats > this.numOfSeats) {
              throw new Error("Booked seats exceeded the limit.");
            }
          },
        },
      },

      full: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          isEqual() {
            if (this.bookedSeats === this.numOfSeats) {
              value = true;
            }
          },
        },
      },

      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        isAfter: DataTypes.NOW,

        validate: {
          bothOrNone() {
            if ((this.startDate === null) !== (this.endDate === null))
              throw new Error("Either both dates, or neither!");
          },
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,

        validate: {
          bothOrNone() {
            if ((this.startDate === null) !== (this.endDate === null))
              throw new Error("Either both dates, or neither!");
          },
        },
      },
      image: { type: DataTypes.STRING, notNull: true },
    },
    { timestamps: false }
  );

  return Event;
};
