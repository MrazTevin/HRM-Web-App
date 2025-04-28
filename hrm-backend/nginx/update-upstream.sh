#!/bin/sh

# Check if BACKEND_URL environment variable is set
if [ -z "$BACKEND_URL" ]; then
  echo "BACKEND_URL environment variable is not set. Using default app:9000"
  BACKEND_URL="app:9000"
fi

# Replace the app:9000 with the environment variable
sed -i "s|http://app:9000|$BACKEND_URL|g" /etc/nginx/conf.d/app.conf

echo "Updated fastcgi_pass to $BACKEND_URL"