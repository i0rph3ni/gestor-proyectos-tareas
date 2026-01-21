const API = 'http://localhost:3000/projects';
const TASK_API = 'http://localhost:3000/tasks';
// Función para cargar todos los proyectos y mostrarlos
function loadProjects() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById('projects');
      ul.innerHTML = ''; // limpiar lista antes de mostrar
      data.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p.name + ' - ' + p.description;
        ul.appendChild(li);
      });
    });
}

// Función para añadir un nuevo proyecto
function addProject() {
  const name = document.getElementById('name').value;
  const description = document.getElementById('desc').value;

  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  })
  .then(res => res.json())
  .then(() => {
    loadProjects(); // recargar lista
    document.getElementById('name').value = '';
    document.getElementById('desc').value = '';
  });
}
// Cargar proyectos en el select de tareas
function loadProjectOptions() {
  fetch('http://localhost:3000/projects')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('projectSelect');
      select.innerHTML = '';
      data.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        select.appendChild(option);
      });
    });
}
function loadProjectEditOptions() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('projectEditSelect');
      select.innerHTML = '';
      data.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        select.appendChild(option);
      });
    });
}
function editProject() {
  const id = document.getElementById('projectEditSelect').value;
  const name = document.getElementById('projectEditName').value;
  const description = document.getElementById('projectEditDesc').value;

  fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById('projectEditName').value = '';
    document.getElementById('projectEditDesc').value = '';
    loadProjects();
    loadProjectOptions(); // actualizar selects de tareas
    loadProjectEditOptions(); // actualizar select de edición
  });
}
function loadTaskEditOptions() {
  fetch(TASK_API)
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('taskEditSelect');
      select.innerHTML = '';
      data.forEach(t => {
        const option = document.createElement('option');
        option.value = t.id;
        option.textContent = `Proyecto ${t.project_id} - ${t.title}`;
        select.appendChild(option);
      });
    });
}
function editTask() {
  const id = document.getElementById('taskEditSelect').value;
  const title = document.getElementById('taskEditTitle').value;
  const status = document.getElementById('taskEditStatus').value;

  fetch(`${TASK_API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById('taskEditTitle').value = '';
    loadTasks();
    loadTaskEditOptions(); // actualizar select de edición
  });
}

// Cargar todas las tareas
function loadTasks() {
  fetch(TASK_API)
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById('tasks');
      ul.innerHTML = '';
      data.forEach(t => {
        const li = document.createElement('li');
        li.textContent = `Proyecto ID ${t.project_id} - ${t.title} [${t.status}]`;

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Eliminar';
        delBtn.onclick = () => deleteTask(t.id);

        li.appendChild(delBtn);
        ul.appendChild(li);
      });
    })
    .catch(err => console.error("Error cargando tareas:", err));
}


// Añadir una nueva tarea
function addTask() {
  const title = document.getElementById('taskTitle').value;
  const status = document.getElementById('taskStatus').value;
  const project_id = document.getElementById('projectSelect').value;

  console.log("Añadiendo tarea:", title, status, project_id); // <-- depuración

  fetch(TASK_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status, project_id })
  })
  .then(res => {
    console.log("Respuesta del backend:", res);
    return res.json();
  })
  .then(data => {
    console.log("Datos devueltos por backend:", data);
    document.getElementById('taskTitle').value = '';
    loadTasks(); // recargar lista de tareas
  })
  .catch(err => console.error("Error en fetch:", err));
}


// Eliminar tarea
function deleteTask(id) {
  fetch(`${TASK_API}/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => loadTasks());
}

// Cargar proyectos al iniciar la página
loadProjects();
loadProjectOptions();
loadProjectEditOptions();
loadTasks();
loadTaskEditOptions();

