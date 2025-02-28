// Define NODE_ENV (Desarrollo o Producción)
process.env.NODE_ENV = process.env.NODE_ENV || "desarrollo";

// Carga las variables de entorno desde el archivo correspondiente
if (process.env.NODE_ENV === "produccion") {
  require("dotenv").config({ path: ".env.production" });
} else {
  require("dotenv").config({ path: ".env.development" });
}

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const puerto = process.env.PORT || 3002;

const dbConfig =
  process.env.NODE_ENV === "produccion"
    ? {
        host: process.env.DB_HOST_PRODUCTION,
        user: process.env.DB_USER_PRODUCTION,
        password: process.env.DB_PASSWORD_PRODUCTION,
        database: process.env.DB_NAME_PRODUCTION,
        port: process.env.DB_PORT_PRODUCTION || 3306,
      }
    : {
        host: process.env.DB_HOST_DEVELOPMENT,
        user: process.env.DB_USER_DEVELOPMENT,
        password: process.env.DB_PASSWORD_DEVELOPMENT,
        database: process.env.DB_NAME_DEVELOPMENT,
        port: process.env.DB_PORT_DEVELOPMENT || 3306,
      };

// Crear la conexión a la base de datos
const db = mysql.createConnection(dbConfig);

// Conectar a la base de datos
db.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error);
  } else {
    console.log("Conexión a la base de datos exitosa");
  }
  // Seleccionar la base de datos
  db.query("USE bfhr115h5hxildpm8s5l", (useDbError) => {
    if (useDbError) {
      console.error("Error al seleccionar la base de datos:", useDbError);
    }
  });
});

// Middleware para analizar datos JSON
app.use(express.json());

// Middleware para analizar datos codificados en URL
app.use(express.urlencoded({ extended: false }));

// Middleware para habilitar CORS
app.use(
  cors({
    origin: "https://proyectos-roxana-mestres.xyz",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware personalizado para registrar información de solicitud
app.use((peticion, respuesta, siguiente) => {
  console.log(`Solicitud recibida desde: ${peticion.headers.origin}`);
  siguiente();
});

// Ruta para manejar formularios de contacto con express-validator
app.post("/contacto", (peticion, respuesta) => {
  console.log("Solicitud POST a /contacto recibida");
  console.log("Datos del formulario:", peticion.body);

  const { nombre, correo, mensaje } = peticion.body;

  if (!nombre || !correo || !mensaje) {
    console.log("Errores de validación en el servidor");
    return respuesta
      .status(400)
      .json({ error: "Campos incorrectos o faltantes" });
  }
  const sql =
    "INSERT INTO  bfhr115h5hxildpm8s5l.contacto (nombre, correo, mensaje) VALUES (?, ?, ?)";
  db.query(sql, [nombre, correo, mensaje], (error, resultado) => {
    if (error) {
      console.error(error);
      respuesta.status(500).json({ error: "Error al enviar el mensaje" });
    } else {
      respuesta.status(200).json({ message: "¡Mensaje enviado con éxito!" });
    }
  });
});

// Rutas público

// Define rutas GET para tus páginas HTML estáticas

app.use(express.static(path.join(__dirname, "publico")));

app.get("/", (peticion, respuesta) => {
  respuesta.sendFile(path.join(__dirname, "index.html"));
});

app.get("/contacto", (peticion, respuesta) => {
  respuesta.sendFile(path.join(__dirname, "contacto.html"));
});

app.get("/servicios", (peticion, respuesta) => {
  respuesta.sendFile(path.join(__dirname, "servicios.html"));
});

app.get("/sobre_nosotros", (peticion, respuesta) => {
  respuesta.sendFile(path.join(__dirname, "sobre_nosotros.html"));
});

// Ruta para manejar suscripciones al correo con express-validator
app.post("/suscribir", (peticion, respuesta) => {
  console.log("Solicitud POST a /suscribir recibida");

  const { correo } = peticion.body;

  // Resto de la lógica para manejar la suscripción al correo
  try {
    const sql =
      "INSERT INTO  bfhr115h5hxildpm8s5l.suscripciones (correo) VALUES (?)";
    db.query(sql, [correo], (error, resultado) => {
      if (error) {
        console.error("Error al insertar en la base de datos:", error);
        respuesta.status(500).json({ error: "Error al suscribirse" });
      } else {
        console.log("Suscripción exitosa");
        respuesta.status(200).json({ message: "¡Suscripción exitosa!" });
      }
    });
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    respuesta.status(500).json({ error: "Error al suscribirse" });
  }
});

// Iniciar el servidor en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor en funcionamiento en el puerto ${puerto}`);
});
