const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const createComic = async (newComic) => {
  const comics = await fs.readFile("comics.txt");
  const comicsJson = JSON.parse(comics);

  comicsJson[uuidv4()] = newComic;

  await fs.writeFile("comics.txt", JSON.stringify(comicsJson, null, 2));

  return newComic;
};

module.exports = createComic;
