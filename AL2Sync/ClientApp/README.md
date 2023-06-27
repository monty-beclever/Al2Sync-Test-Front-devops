# Al2sync

[![Netlify Status](https://api.netlify.com/api/v1/badges/a9942414-7506-4f23-a71e-35719fc9d454/deploy-status)](https://app.netlify.com/sites/al2sync-frontend-dev/deploys)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Docker file
1. Primero debemos establecer la version de node que queremos utilizar.

2. Con `npm ci` instalamos todas las dependencias del proyecto.

3. Finalmente con `npm run build --prod -- --base-href='/'` compilamos el proyecto.

4. Seleccionamos la version de nginx que vamos a utilizar.

5. Copiamos el proyecto compilado, y lo movemos a las carpetas de sitios de nginx

6. Copiamos nuestro archivo de configuración personalizado de nginx y lo remplazamos por el archivo por defecto

7. Cuando el contenedor se inicie, remplazamos el env.js con los valores de las variables de entorno

## Deploy
Para hacer el deploy en docker utilizaremos el archivo `docker-compose.yml`

En este archivo hay que configurar los parámetros:

`image` en el cual pondremos el nombre de la imagen de docker que vamos a utilizar.

`environment` donde vamos a configurar las variables de entorno necesarias.

`ports` en caso de que sea necesario, con este parámetro vamos a poder configurar el puerto en el que se va a ejecutar el sitio


Una vez que hayamos configurado el `dockerfile` y el archivo `docker-compose.yml` vamos a ejecutar, desde la consola, el comando `docker compose up` situándonos en la misma ruta donde se encuentra el archivo `docker-compose.yml`.

Si no tuvimos ningún error, vamos a poder acceder al sitio desde `http://localhost:8200/`
