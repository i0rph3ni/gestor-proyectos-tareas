const express = require('express');
const cors = require('cors'); // <-- importar cors
const app = express();
const PORT = 3000;

// permite leer datos JSON
app.use(express.json());

// habilitar CORS ANTES de las rutas
app.use(cors()); // <-- permite que cualquier frontend acceda al backend

// rutas
app.use('/projects', require('./routes/projects'));
app.use('/tasks', require('./routes/tasks'));

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
