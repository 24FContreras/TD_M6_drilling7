const fs = require("fs/promises");

const readAutos = async () => {
  const autos = await fs.readFile("autos.txt");
  return autos;
};

module.exports = readAutos;
