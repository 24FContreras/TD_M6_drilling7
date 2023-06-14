const fs = require("fs/promises");

const modificarComic = async (id, datos) => {
  const comics = await fs.readFile("comics.txt");
  const comicsJson = JSON.parse(comics);

  const comicOriginal = comicsJson[id];
  const comicActualizado = { ...comicOriginal, ...datos };

  comicsJson[id] = comicActualizado;

  await fs.writeFile("comics.txt", JSON.stringify(comicsJson, null, 2));
};

module.exports = { modificarComic };
