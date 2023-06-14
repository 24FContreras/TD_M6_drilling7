const http = require("http");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

//FUNCTIONS
const { crearComic } = require("./comics/crear.comics.js");
const { obtenerComics } = require("./comics/leer.comics.js");
const { modificarComic } = require("./comics/modificar.comics.js");
const { eliminarComic } = require("./comics/eliminar.comics.js");

const { obtenerAutos } = require("./autos/leer.autos.js");

http
  .createServer(async (req, res) => {
    const { searchParams, pathname } = new URL(
      req.url,
      `http://${req.headers.host}`
    );
    const params = new URLSearchParams(searchParams);

    // COMICS //

    //GET
    if (pathname === "/comics" && req.method === "GET") {
      const comics = await obtenerComics();
      res.write(comics);
      res.end();
    }

    //POST
    if (pathname === "/comics" && req.method === "POST") {
      let nuevoComic;

      req.on("data", (data) => {
        nuevoComic = JSON.parse(data);
      });

      req.on("end", async () => {
        await crearComic(nuevoComic);
        res.write("Cómic añadido exitosamente");
        res.end();
      });
    }

    //PUT
    if (pathname === "/comics" && req.method === "PUT") {
      const id = params.get("id");
      let datosNuevos;

      req.on("data", (datos) => {
        datosNuevos = JSON.parse(datos);
      });

      req.on("end", async () => {
        modificarComic(id, datosNuevos);
        res.write("Los datos han sido modificados exitosamente");
        res.end();
      });
    }

    //DELETE
    if (req.url.startsWith("/comics") && req.method === "DELETE") {
      const id = params.get("id");

      await eliminarComic(id);

      res.write(`El comic ID ${id} ha sido eliminado exitosamente`);
      res.end();
    }

    // AUTOS //
    //GET
    if (pathname === "/autos" && req.method === "GET") {
      const autos = await obtenerAutos();
      res.write(autos);
      res.end();
    }

    //POST AUTOS
    if (pathname === "/autos" && req.method === "POST") {
      const autosJson = JSON.parse(autos);
      let id = uuidv4();
      let nuevoAuto;

      req.on("data", (data) => {
        nuevoAuto = JSON.parse(data);
      });

      req.on("end", async () => {
        autosJson[id] = nuevoAuto;

        await fs.writeFile("autos.txt", JSON.stringify(autosJson, null, 2));
        res.write("Automóvil agregado exitosamente");
        res.end();
      });
    }

    //PUT AUTOS
    if (pathname === "/autos" && req.method === "PUT") {
      const id = params.get("id");
      const autosJson = JSON.parse(autos);
      let datosNuevos;

      req.on("data", (datos) => {
        datosNuevos = JSON.parse(datos);
      });

      req.on("end", async () => {
        const autoOriginal = autosJson[id];
        const autoActualizado = { ...autoOriginal, ...datosNuevos };
        autosJson[id] = autoActualizado;
        await fs.writeFile("autos.txt", JSON.stringify(autosJson, null, 2));
        res.write("Los datos del vehículo han sido modificados exitosamente");
        res.end();
      });
    }

    //DELETE AUTOS
    if (req.url.startsWith("/autos") && req.method === "DELETE") {
      const id = params.get("id");
      const autosJson = JSON.parse(autos);

      delete autosJson[id];

      await fs.writeFile("autos.txt", JSON.stringify(autosJson, null, 2));

      res.write(`El vehíhulo ID ${id} ha sido eliminado exitosamente`);
      res.end();
    }
  })
  .listen(3000, () => console.log("🟢 Servidor iniciado en el puerto 3000"));
