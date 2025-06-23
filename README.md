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

## 🌐 Rutas principales

| Ruta                         | Descripción                                         |
|------------------------------|-----------------------------------------------------|
| `/login`                    | Iniciar sesión                                      |
| `/register`                 | Registro de nuevo usuario                           |
| `/boards`                   | Página de tableros del usuario                      |
| `/boards/{id}`              | Ver un tablero (listas y tareas)                    |
| `/calendar`                 | Vista de calendario con tareas asignadas           |
| `/settings/profile`         | Configuración de perfil (nombre, email, avatar)     |

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
- Cuenta gratuita en Cloudinary (opcional pero recomendado)

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