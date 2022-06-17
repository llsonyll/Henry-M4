const { Sequelize, Op } = require("sequelize");
const modelCharacter = require("./models/Character.js");
const modelAbility = require("./models/Ability.js");
const modelRole = require("./models/Role.js");

const db = new Sequelize(
  "postgres://postgres:Qk45l80t@localhost:5432/henry_sequelize",
  {
    logging: false,
  }
);

modelCharacter(db);
modelAbility(db);
modelRole(db);

const { Ability, Character, Role } = db.models;

//Associations
Ability.belongsTo(Character);
Character.hasMany(Ability);
Character.belongsToMany(Role, { through: "Character_Role" });
Role.belongsToMany(Character, { through: "Character_Role" });

module.exports = {
  ...db.models,
  db,
  Op,
};
