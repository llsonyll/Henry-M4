const { Ability } = require("../db");

const createAbility = async (req, res) => {
  const { ability } = req.body;

  if (!ability.name || !ability.mana_cost) {
    return res.status(404).send("Falta enviar datos obligatorios");
  }

  try {
    const newAbility = await Ability.create(ability);
    return res.status(201).json(newAbility);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const setCharacter = async (req, res) => {
  const { idAbility, codeCharacter } = req.body;

  if (!idAbility || !codeCharacter) {
    return res
      .status(404)
      .send("Faltan datos necesarios id o codigo de personaje");
  }

  const ability = await Ability.findByPk(idAbility);

  if (!ability) {
    return res
      .status(404)
      .send("El id provisto no corresponde a un personaje en la DB");
  }

  try {
    await ability.setCharacter(codeCharacter);
    return res.status(200).json(ability);
  } catch (error) {
    return res.status(400).send("Ocurrio un error");
  }
};

module.exports = {
  createAbility,
  setCharacter,
};
