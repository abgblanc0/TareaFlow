# 🧠 TareaFlow

TareaFlow es una aplicación web para la gestión colaborativa de tareas y proyectos, al estilo de Trello. Permite crear tableros, añadir listas y tareas, asignar fechas, subir imágenes, colaborar en equipo y visualizar tareas en un calendario.

## 🚀 Características principales

- ✅ Registro e inicio de sesión de usuarios
- 🧑‍🤝‍🧑 Creación de tableros personales y compartidos
- 📋 Listas de tareas ordenables por drag & drop
- ✅ Tareas con descripciones, fechas límite, comentarios e imágenes
- 🗓️ Vista de calendario con tareas por fecha
- 🖼️ Subida de avatares de usuario vía Cloudinary
- 🔒 Roles básicos: creador y colaboradores
- 📦 Comentarios editables y eliminables por su autor

---

## 📚 Rutas del proyecto

### 🔹 Tableros

| Método | Ruta                                       | Descripción                                         |
|--------|--------------------------------------------|-----------------------------------------------------|
| GET    | `/boards`                                  | Lista los tableros del usuario                      |
| GET    | `/boards/{board}`                          | Muestra un tablero específico                       |
| POST   | `/boards`                                  | Crea un nuevo tablero                               |
| DELETE | `/boards/{board}`                          | Elimina un tablero                                  |
| POST   | `/boards/{board}/invite`                   | Invita a otro usuario al tablero                    |
| PUT    | `/boards/{board}/reorderLists`             | Reordena las listas de un tablero                   |
| PUT    | `/boards/{board}/reorderTasks`             | Reordena y mueve tareas entre listas                |

### 🔹 Listas

| Método | Ruta                     | Descripción                             |
|--------|--------------------------|-----------------------------------------|
| POST   | `/{board}/lists`         | Crea una nueva lista en un tablero      |
| PUT    | `/lists/{taskList}`      | Actualiza el título de una lista        |
| DELETE | `/lists/{taskList}`      | Elimina una lista                       |

### 🔹 Tareas

| Método | Ruta                      | Descripción                             |
|--------|---------------------------|-----------------------------------------|
| POST   | `/{taskList}/tasks`       | Crea una nueva tarea en una lista       |
| PUT    | `/tasks/{task}`           | Edita una tarea existente               |
| DELETE | `/tasks/{task}`           | Elimina una tarea                       |

### 🔹 Comentarios

| Método | Ruta                          | Descripción                     |
|--------|-------------------------------|---------------------------------|
| POST   | `/tasks/{task}/comments`      | Añade un comentario a una tarea |
| DELETE | `/comments/{comment}`         | Elimina un comentario propio    |

### 🔹 Calendario

| Método | Ruta         | Descripción                             |
|--------|--------------|-----------------------------------------|
| GET    | `/calendar`  | Muestra tareas en vista calendario      |

---

## 🛠️ Tecnologías utilizadas

- ⚙️ **Backend:** Laravel 10 / 12 (PHP 8.2+)
- 🧠 **Frontend:** React + Inertia.js
- 🎨 **UI:** TailwindCSS + HeadlessUI + ShadCN
- 📦 **DND:** dnd-kit para drag & drop
- 🗃️ **Base de datos:** PostgreSQL o MySQL
- ☁️ **Almacenamiento de imágenes:** Cloudinary

---

## 🧪 ¿Cómo ejecutar el proyecto?

### Requisitos

- PHP 8.2+
- Node.js y npm
- Composer
- Laravel CLI
- Base de datos (MySQL o PostgreSQL)

### Instrucciones

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/tareaflow.git
cd tareaflow

2. Instalar dependencias

composer install
npm install

3. Configurar el entorno

cp .env.example .env
php artisan key:generate

Completa en .env tus datos de conexión a base de datos

DB_DATABASE=tareaflow
DB_USERNAME=root
DB_PASSWORD=

4. Migrar la base de datos y llenarla

php artisan migrate
php artisan db:seed

5. Correr servidor

Composer run dev