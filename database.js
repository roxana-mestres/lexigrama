const mysql = require("mysql2");
const dbConfig = require("./db-config");

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

// Establecer la conexión
connection.connect((error) => {
  if (error) {
    console.error("Error de conexión a la base de datos:", error);
  } else {
    console.log("Conexión a la base de datos MySQL establecida.");
  }
});
