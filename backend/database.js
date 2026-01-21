const sqlite3 = require('sqlite3').verbose();

// Conectar con la base de datos (archivo)
const db = new sqlite3.Database('./database.sqlite');

// Crear tablas si no existen
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL
      )`);
      // Crear tabla de tareas si no existe
db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  project_id INTEGER NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id)
)`);

});

module.exports = db;
