const http = require("http");

//IMPORTS FUNCIONES COMIC
const readComics = require("./comics/read");
const createComic = require("./comics/create");
const updateComic = require("./comics/update");
const deleteComic = require("./comics/delete");

//IMPORTS FUNCIONES AUTO
const readAutos = require("./autos/read");
const createAuto = require("./autos/create");
const updateAuto = require("./autos/update");
const deleteAuto = require("./autos/delete");

const server = http.createServer(async (req, res) => {
  const { searchParams, pathname } = new URL(
    req.url,
    `http://${req.headers.host}`
  );
  const params = new URLSearchParams(searchParams);

  // COMICS //

  //GET COMICS
  if (pathname === "/comics" && req.method === "GET") {
    try {
      const comics = await readComics();
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

  // AUTOS //

  //GET AUTOS
  if (pathname === "/autos" && req.method === "GET") {
    try {
      const autos = await readAutos();
      res.setHeader("content-type", "application/json");
      res.write(autos);
    } catch (error) {
      res.write("Los autos no pudieron ser leídos");
    } finally {
      res.end();
    }
  }

  //POST AUTOS
  if (pathname === "/autos" && req.method === "POST") {
    let nuevoAuto;

    req.on("data", (data) => {
      nuevoAuto = JSON.parse(data);
    });

    req.on("end", async () => {
      try {
        const autoAgregado = await createAuto(nuevoAuto);
        res.write(
          `El auto '${autoAgregado.marca} ${autoAgregado.modelo}' se ha añadido exitosamente`
        );
      } catch (error) {
        res.write(`Lo sentimos! Hubo un error al crear el vehículo`);
      } finally {
        res.end();
      }
    });
  }

  //PUT AUTOS
  if (pathname === "/autos" && req.method === "PUT") {
    const id = params.get("id");
    let datosNuevos;

    req.on("data", (datos) => {
      datosNuevos = JSON.parse(datos);
    });

    req.on("end", async () => {
      try {
        const autoActualizado = await updateAuto(id, datosNuevos);

        if (!autoActualizado)
          throw new Error("El vehículo que intenta actualizar no existe");

        res.write(
          `Los datos del auto '${autoActualizado.marca} ${autoActualizado.modelo}' han sido modificados exitosamente`
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

  //DELETE AUTOS
  if (req.url.startsWith("/autos") && req.method === "DELETE") {
    const id = params.get("id");

    try {
      const autoEliminado = await deleteAuto(id);

      if (!autoEliminado)
        throw new Error("El vehículo que intenta eliminar no existe");

      res.write(
        `El auto '${autoEliminado.marca} ${autoEliminado.modelo}' ha sido eliminado exitosamente`
      );
    } catch (error) {
      res.write(
        error.message || "Lo sentimos! No se ha podido eliminar el auto"
      );
    } finally {
      res.end();
    }
  }
});

server.listen(3000, () =>
  console.log("🟢 Servidor iniciado en el puerto 3000")
);
