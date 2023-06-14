const fs = require("fs/promises");

const obtenerComics = async () => {
  const comics = await fs.readFile("comics.txt");

  return comics;
};

module.exports = { obtenerComics };
