const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const crearComic = async (nuevo) => {
  const comics = await fs.readFile("comics.txt");
  const datosJson = JSON.parse(comics);
  const id = uuidv4();

  datosJson[id] = nuevo;
  await fs.writeFile("comics.txt", JSON.stringify(datosJson, null, 2));
};

module.exports = { crearComic };
