const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database');

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // carpeta para guardar imágenes

// POST /projects/:id/image → subir imagen
router.post('/:id/image', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const imagePath = req.file.path; // ruta de la imagen

  db.run('UPDATE projects SET image = ? WHERE id = ?', [imagePath, id], function() {
    res.json({ changes: this.changes, image: imagePath });
  });
});

// GET /projects → lista todos los proyectos
router.get('/', (req, res) => {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
// PUT /projects/:id → actualizar proyecto
router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  db.run('UPDATE projects SET name = ?, description = ? WHERE id = ?', [name, description, id], function() {
    res.json({ changes: this.changes });
  });
});

// POST /projects → crea un proyecto
router.post('/',
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, description } = req.body;
    db.run('INSERT INTO projects (name, description) VALUES (?, ?)', [name, description], function() {
      res.json({ id: this.lastID });
    });
  }
);

module.exports = router;
