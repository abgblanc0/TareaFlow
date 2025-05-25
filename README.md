
# TareaFlow

Una web para administrarse con listas de tareas

## Correr Localmente

Clonar el proyecto

```bash
  git clone https://github.com/abgblanc0/TareaFlow
  cd TareaFlow
```

Instalar dependencias y Laravel
```bash
  npm install && npm run build
  composer global require laravel/installer
```
IMPORTANTE Crear el .env (copiar el de ejemplo y rellenar)

Poner en DB_CONNECTION=pgsql

Y rellenar info de la bbdd


Corremos las migraciones y si queremos rellenamos la bbdd con datos aleatorios:

```bash
  php artisan migrate
  php artisan db:seed // Las factories llenan de datos la bbdd, opcional
```

Ahora si abrimos el server:
```bash
  composer run dev
```
