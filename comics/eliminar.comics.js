const fs = require("fs/promises");

const eliminarComic = async (id) => {
  const comics = await fs.readFile("comics.txt");
  const comicsJson = JSON.parse(comics);

  delete comicsJson[id];
  await fs.writeFile("comics.txt", JSON.stringify(comicsJson, null, 2));
};

module.exports = { eliminarComic };
