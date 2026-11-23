# syntax=docker/dockerfile:1
FROM php:8.4-fpm-alpine AS php-base
RUN apk add --no-cache --virtual .php-build-deps oniguruma-dev libxml2-dev $PHPIZE_DEPS \
 && docker-php-ext-install -j$(nproc) pdo_mysql mbstring xml \
 && apk del .php-build-deps

FROM php-base AS dependencies
RUN apk add --no-cache --virtual .build-deps git unzip
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
WORKDIR /var/www/html
COPY composer.* ./
# If composer.lock is provided, Composer uses the locked versions.
RUN composer install --no-dev --prefer-dist --no-interaction --no-scripts --no-progress --optimize-autoloader

FROM php-base AS runtime
WORKDIR /var/www/html
COPY --from=dependencies /var/www/html/vendor ./vendor
COPY . .
RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
 && chown -R www-data:www-data storage bootstrap/cache
USER www-data
EXPOSE 9000
CMD ["php-fpm"]
