const fs = require("fs/promises");

const readComic = async () => {
  const comics = await fs.readFile("comics.txt");
  return comics;
};

module.exports = readComic;
