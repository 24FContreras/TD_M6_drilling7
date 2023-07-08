const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const createAuto = async (newCar) => {
  const autos = await fs.readFile("autos.txt");
  const autosJson = JSON.parse(autos);

  autosJson[uuidv4()] = newCar;

  await fs.writeFile("autos.txt", JSON.stringify(autosJson, null, 2));

  return newCar;
};

module.exports = createAuto;
