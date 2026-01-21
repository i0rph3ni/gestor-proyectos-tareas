# Gestor de Proyectos y Tareas

## Descripción
Aplicación web para gestionar proyectos y tareas.  
Permite crear, ver, editar y eliminar proyectos y tareas.  
Cada tarea está asociada a un proyecto.

## Tecnologías
- Backend: Node.js, Express, SQLite, express-validator, CORS
- Frontend: HTML, CSS, JavaScript
- Base de datos: SQLite

## Estructura del proyecto
proyecto-final/
backend/
frontend/
API Endpoints

##Funcionalidades Implementadas: 
#Backend

GET /projects > listar proyectos

POST /projects > crear proyecto

PUT /projects/:id > editar proyecto

DELETE /projects/:id > eliminar proyecto

GET /tasks > listar tareas

POST /tasks > crear tarea

PUT /tasks/:id > editar tarea

DELETE /tasks/:id > eliminar tarea

##Frontend

Crear, ver, editar y eliminar proyectos

Crear, ver, editar y eliminar tareas

Relación tareas | proyectos

Los selects se actualizan automáticamente

Todo dinámico usando fetch y JavaScript puro

##Instrucciones para ejecutar el proyecto
#Backend

Abrir terminal en backend

Instalar dependencias:

npm install


Ejecutar servidor:

node app.js


El backend escuchará en http://localhost:3000

#Frontend

Abrir frontend/index.html con Live Server en VS Code

La URL será algo como:

http://127.0.0.1:5500/index.html


Todo CRUD funcionará desde la página web:

Crear/editar/eliminar proyectos

Crear/editar/eliminar tareas

Selección automática de proyectos para tareas

#############################################


Autor

Moisés Martín Moreno
