#!/bin/sh

# Check if BACKEND_URL environment variable is set
if [ -z "$BACKEND_URL" ]; then
  echo "BACKEND_URL environment variable is not set. Using default."
  BACKEND_URL="https://hrm-web-app-gha1.onrender.com"
fi

# Replace the proxy_pass line in nginx config
sed -i "s|proxy_pass .*;|proxy_pass $BACKEND_URL;|g" /etc/nginx/conf.d/app.conf

echo "Updated proxy_pass to $BACKEND_URL"