const { Router } = require("express");
const { Ability } = require("../db");
const router = Router();

const {
  createAbility,
  setCharacter,
} = require("../controllers/abilityControllers");

router.route("/").post(createAbility);
router.route("/setCharacter").put(setCharacter);

module.exports = router;
