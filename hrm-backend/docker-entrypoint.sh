#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    php artisan key:generate
fi


while ! php -r "try { new PDO('pgsql:host=$DB_HOST;dbname=$DB_DATABASE', '$DB_USERNAME', '$DB_PASSWORD'); echo 'connected'; } catch(PDOException \$e) { exit(1); }" 2>/dev/null; do
    echo "Database connection not ready yet..."
    sleep 5
done

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Start PHP-FPM
echo "Starting PHP-FPM..."
exec php-fpm