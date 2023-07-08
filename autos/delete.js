const fs = require("fs/promises");

const deleteAuto = async (id) => {
  const autos = await fs.readFile("autos.txt");
  const autosJson = JSON.parse(autos);
  const autoEliminado = autosJson[id];

  delete autosJson[id];

  await fs.writeFile("autos.txt", JSON.stringify(autosJson, null, 2));

  return autoEliminado;
};

module.exports = deleteAuto;
