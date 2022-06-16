const { Character, Op } = require("../db");
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries

const createCharacter = async (req, res) => {
  const { code, name, age, race, hp, mana } = req.body;

  if (!code || !name || !hp || !mana) {
    return res.status(404).send("Falta enviar datos obligatorios");
  }

  try {
    const character = await Character.create({
      code,
      name,
      age: age ?? null,
      hp,
      mana,
      race: race ?? "Other",
    });
    return res.status(201).json(character);
  } catch (error) {
    // console.log(error);
    return res.status(404).send("Error en alguno de los datos provistos");
  }
};

const getCharacter = async (req, res) => {
  const { race, age, name, hp } = req.query;

  try {
    if (!race) {
      const characters = await Character.findAll();
      return res.status(200).json(characters);
    }

    if (race && age) {
      const characters = await Character.findAll({
        where: {
          [Op.and]: [{ race }, { age }],
        },
      });
      return res.status(200).json(characters);
    }

    const charactersByRace = await Character.findAll({
      where: {
        race,
      },
    });

    return res.status(200).json(charactersByRace);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Fallo la solicitud por algun dato provisto",
    });
  }
};

const getCharacterByCode = async (req, res) => {
  const { code } = req.params;

  if (!code) {
    return res.status(400).json({
      error: "Codigo de personaje no provisto",
    });
  }

  try {
    const character = await Character.findOne({
      where: { code },
    });

    if (!character) {
      return res
        .status(404)
        .send(`El código ${code} no corresponde a un personaje existente`);
    }

    return res.status(200).json(character);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: `Fallo la solicitud realizada, intentelo despues`,
    });
  }
};

const getCharacterYoung = async (req, res) => {
  const charactersUnder25 = await Character.findAll({
    where: {
      age: {
        [Op.lt]: 25,
      },
    },
  });
  return res.status(200).json(charactersUnder25);
};

const updateCharacterAttribute = async (req, res) => {
  const { attribute } = req.params;
  const { value } = req.query;

  if (!attribute) {
    return res.status(400).json({
      error: "Atributo de personaje no provisto",
    });
  }

  if (!value) {
    return res.status(400).json({
      error: "Valor a actualizar no provisto",
    });
  }

  // if (Character.hasKey) {
  // Validar que el atributo corresponda al modelo
  // }

  try {
    await Character.update(
      { [attribute]: value },
      {
        where: {
          [attribute]: null,
        },
      }
    );

    return res.status(200).send("Personajes actualizados");
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = {
  getCharacter,
  createCharacter,
  getCharacterByCode,
  getCharacterYoung,
  updateCharacterAttribute,
};
