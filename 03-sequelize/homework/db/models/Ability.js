const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Ability", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    name_mana: {
      type: DataTypes.VIRTUAL,
      unique: true,
      get() {
        return `${this.name}-${this.mana_cost}`;
      },
    },
  });
};
