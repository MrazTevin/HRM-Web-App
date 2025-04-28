#!/bin/bash

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp -n .env.example .env
    php artisan key:generate
fi

# Run migrations
php artisan migrate --force

# Start PHP-FPM
php-fpm -D

# Start nginx
nginx -g "daemon off;"