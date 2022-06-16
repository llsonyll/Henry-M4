const express = require("express");
const router = express.Router();

const {
  createCharacter,
  getCharacter,
  getCharacterByCode,
} = require("../controllers/characterControllers.js");

router.route("/").post(createCharacter).get(getCharacter);
router.route("/:code").get(getCharacterByCode);

module.exports = router;
