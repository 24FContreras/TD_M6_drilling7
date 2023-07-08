const fs = require("fs/promises");

const readComics = async () => {
  const comics = await fs.readFile("comics.txt");
  return comics;
};

module.exports = readComics;
