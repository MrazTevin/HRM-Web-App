#!/bin/bash

# Run migrations before starting the PHP-FPM server
php artisan migrate --force

# Now run the actual PHP-FPM server
exec php-fpm