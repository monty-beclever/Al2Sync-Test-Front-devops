# Definimos la version de node que vamos a utilizar
FROM node:16.15.1 as node

ARG ENV=prod
ARG APP=al2sync

ENV ENV ${ENV}
ENV APP ${APP}

WORKDIR /app
COPY ./ /app/

# Instala y construye el Angular App
RUN echo 'Downloading dependencies'
RUN npm ci
RUN echo 'npm run build'
RUN npm run build --prod -- --base-href='/'
#RUN mv /app/dist/* /app/dist/

# Definimos la version de nginx que vamos a utilizar
FROM nginx:1

# Copiamos el proyecto compilado, y lo movemos a las carpetas de sitios de nginx
COPY --from=node /app/dist/ /usr/share/nginx/html/
# Copiamos nuestro archivo de configuracion personalizado de nginx
# y lo remplazamos por el archivo por defecto
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Cuando el contenedor se inicie, remplazamos el envjs con los valores de las variables de entorno
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]

