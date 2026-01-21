import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

const API = 'http://localhost:3000/projects';

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  // Cargar proyectos al iniciar
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  // Añadir proyecto
  const addProject = () => {
    fetch(API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, description: desc})
    })
    .then(res => res.json())
    .then(() => {
      setName('');
      setDesc('');
      // recargar lista
      fetch(API).then(res => res.json()).then(data => setProjects(data));
    });
  };

  return (
    <div>
      <h2>Proyectos</h2>
      <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Descripción" value={desc} onChange={e => setDesc(e.target.value)} />
      <button onClick={addProject}>Añadir Proyecto</button>

      <ul>
        {projects.map(p => <li key={p.id}>{p.name} - {p.description}</li>)}
      </ul>
    </div>
  );
}

export default App;
