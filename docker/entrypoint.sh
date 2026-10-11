#!/bin/sh
set -e

# Esperar a que MySQL acepte conexiones
until php -r "new PDO('mysql:host='.getenv('DB_HOST').';port='.(getenv('DB_PORT') ?: 3306), getenv('DB_USERNAME'), getenv('DB_PASSWORD'));" 2>/dev/null; do
    echo "Esperando a la base de datos..."
    sleep 2
done

# Enlace public/storage -> storage/app/public (para las fotos de los perfumes)
php artisan storage:link --force || true

# Crear o actualizar las tablas
php artisan migrate --force

if [ "$APP_ENV" = "production" ]; then
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

chown -R www-data:www-data storage bootstrap/cache

exec "$@"