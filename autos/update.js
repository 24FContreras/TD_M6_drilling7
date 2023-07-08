const fs = require("fs/promises");

const updateAuto = async (id, datosNuevos) => {
  const autos = await fs.readFile("autos.txt");
  const autosJson = JSON.parse(autos);

  const autoOriginal = autosJson[id];
  const autoActualizado = { ...autoOriginal, ...datosNuevos };

  if (!autoOriginal) return;

  autosJson[id] = autoActualizado;

  await fs.writeFile("autos.txt", JSON.stringify(autosJson, null, 2));

  return autoActualizado;
};

module.exports = updateAuto;
