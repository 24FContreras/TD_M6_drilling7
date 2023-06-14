const fs = require("fs/promises");

const obtenerAutos = async () => {
  const autos = await fs.readFile("autos.txt");

  return autos;
};

module.exports = { obtenerAutos };
