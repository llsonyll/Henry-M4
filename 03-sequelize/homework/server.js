const express = require("express");
const characterMiddleware = require("./middlewares/character.js");
const abilityMiddleware = require("./middlewares/ability.js");

const server = express();

server.use(express.json());

server.use("/character", characterMiddleware);
server.use("/ability", abilityMiddleware);

module.exports = server;
