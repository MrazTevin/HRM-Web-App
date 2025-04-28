FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install dependencies including nginx
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    vim \
    unzip \
    git \
    curl \
    libzip-dev \
    libonig-dev \
    libpq-dev \
    nginx

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy code
COPY . /var/www/html

# Install dependencies
RUN composer install --no-interaction --optimize-autoloader

# Copy nginx configuration
COPY nginx.conf /etc/nginx/sites-available/default

# Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Script to start both services
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose port 80
EXPOSE 80

# Set the entrypoint
CMD ["/start.sh"]