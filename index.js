const http = require("http");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

//IMPORTS COMIC
const readComic = require("./comics/read");
const createComic = require("./comics/create");
const updateComic = require("./comics/update");
const deleteComic = require("./comics/delete");

const server = http.createServer(async (req, res) => {
  const { searchParams, pathname } = new URL(
    req.url,
    `http://${req.headers.host}`
  );
  const params = new URLSearchParams(searchParams);
  const comics = await fs.readFile("comics.txt");
  const autos = await fs.readFile("autos.txt");

  //COMICS

  //GET COMICS
  if (pathname === "/comics" && req.method === "GET") {
    try {
      const comics = await readComic();
      res.setHeader("content-type", "application/json");
      res.write(comics);
    } catch (error) {
      res.write("Los comics no pudieron ser leídos");
    } finally {
      res.end();
    }
  }

  //POST COMICS
  if (pathname === "/comics" && req.method === "POST") {
    let nuevoComic;

    req.on("data", (data) => {
      nuevoComic = JSON.parse(data);
    });

    req.on("end", async () => {
      try {
        const comicAgregado = await createComic(nuevoComic);
        res.write(`'${nuevoComic.titulo}' se ha añadido exitosamente`);
      } catch (error) {
        res.write(`Lo sentimos! Hubo un error al crear el comic`);
      } finally {
        res.end();
      }
    });
  }

  //PUT COMICS
  if (pathname === "/comics" && req.method === "PUT") {
    const id = params.get("id");
    let datosNuevos;

    req.on("data", (datos) => {
      datosNuevos = JSON.parse(datos);
    });

    req.on("end", async () => {
      try {
        const comicActualizado = await updateComic(id, datosNuevos);

        if (!comicActualizado)
          throw new Error("El cómic que intenta actualizar no existe");

        res.write(
          `Los datos de '${comicActualizado.titulo}' han sido modificados exitosamente`
        );
      } catch (error) {
        res.write(
          error.message ||
            "Lo sentimos! No se ha podido realizar la modificación"
        );
      } finally {
        res.end();
      }
    });
  }

  //DELETE COMICS
  if (req.url.startsWith("/comics") && req.method === "DELETE") {
    const id = params.get("id");

    try {
      const comicEliminado = await deleteComic(id);

      if (!comicEliminado)
        throw new Error("El cómic que intenta eliminar no existe");

      res.write(`'${comicEliminado.titulo}' ha sido eliminado exitosamente`);
    } catch (error) {
      res.write(
        error.message || "Lo sentimos! No se ha podido eliminar el cómic"
      );
    } finally {
      res.end();
    }
  }

  //AUTOS

  //GET AUTOS
  if (pathname === "/autos" && req.method === "GET") {
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
});

server.listen(3000, () =>
  console.log("🟢 Servidor iniciado en el puerto 3000")
);
