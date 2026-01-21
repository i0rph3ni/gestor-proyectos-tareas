const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database');

const router = express.Router();

// GET /tasks → lista todas las tareas
router.get('/', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /tasks → crea una nueva tarea
router.post('/',
  [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('status').notEmpty().withMessage('El estado es obligatorio'),
    body('project_id').notEmpty().withMessage('El proyecto asociado es obligatorio')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, status, project_id } = req.body;
    db.run('INSERT INTO tasks (title, status, project_id) VALUES (?, ?, ?)', 
      [title, status, project_id], function() {
        res.json({ id: this.lastID });
      });
  }
);

// PUT /tasks/:id → actualizar tarea

router.put('/:id',
  [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('status').notEmpty().withMessage('El estado es obligatorio')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, status } = req.body;
    const { id } = req.params;
    db.run('UPDATE tasks SET title = ?, status = ? WHERE id = ?', [title, status, id], function() {
      res.json({ changes: this.changes });
    });
  }
);

// DELETE /tasks/:id → eliminar tarea
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', [id], function() {
    res.json({ changes: this.changes });
  });
});

module.exports = router;
