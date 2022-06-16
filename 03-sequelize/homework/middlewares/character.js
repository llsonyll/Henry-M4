const { Router } = require("express");
// const { Op, Character, Role } = require("../db");
const router = Router();

const {
  createCharacter,
  getCharacter,
  getCharacterByCode,
  getCharacterYoung,
  updateCharacterAttribute,
} = require("../controllers/characterControllers.js");

router.route("/").post(createCharacter).get(getCharacter);
router.route("/young").get(getCharacterYoung);
router.route("/:code").get(getCharacterByCode);
router.route("/:attribute").put(updateCharacterAttribute);

module.exports = router;
