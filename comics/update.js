const fs = require("fs/promises");

const updateComic = async (id, datosNuevos) => {
  const comics = await fs.readFile("comics.txt");
  const comicsJson = JSON.parse(comics);

  const comicOriginal = comicsJson[id];
  const comicActualizado = { ...comicOriginal, ...datosNuevos };

  if (!comicOriginal) return;

  comicsJson[id] = comicActualizado;

  await fs.writeFile("comics.txt", JSON.stringify(comicsJson, null, 2));

  return comicActualizado;
};

module.exports = updateComic;
