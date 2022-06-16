const { Character } = require("../db");

const createCharacter = async (req, res) => {
  const { code, name, age, race, hp, mana } = req.body;

  if (!code || !name || !age || !hp || !mana) {
    res.status(404).json({
      error: "Falta enviar datos obligatorios",
    });
  }

  const character = await Character.create({
    code,
    name,
    age,
    hp,
    mana,
    race: race ?? "Other",
  });

  return res.status(200).json(character);
};

const getCharacter = async (req, res) => {
  const { race } = req.query;

  if (!race) {
    const characters = await Character.findAll();
    return res.status(200).json(characters);
  }
};

const getCharacterByCode = async (req, res) => {};

module.exports = {
  getCharacter,
  createCharacter,
  getCharacterByCode,
};
