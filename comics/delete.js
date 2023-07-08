const fs = require("fs/promises");

const deleteComic = async (id) => {
  const comics = await fs.readFile("comics.txt");
  const comicsJson = JSON.parse(comics);
  const comicEliminado = comicsJson[id];

  delete comicsJson[id];

  await fs.writeFile("comics.txt", JSON.stringify(comicsJson, null, 2));

  return comicEliminado;
};

module.exports = deleteComic;
