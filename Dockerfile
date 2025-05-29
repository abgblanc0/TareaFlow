FROM richarvey/nginx-php-fpm:3.1.6

# Copia el código
COPY . /var/www/html

# Instala Node.js y npm
RUN apk add --no-cache nodejs npm

# Instala dependencias de Composer
RUN composer install --optimize-autoloader --no-dev

# Instala dependencias de npm y construye assets de Vite
WORKDIR /var/www/html
RUN npm install
RUN npm run build

# Configura permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Configuración de la imagen
ENV SKIP_COMPOSER 0
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

CMD ["/start.sh"]