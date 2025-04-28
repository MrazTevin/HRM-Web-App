#!/bin/sh

# Check if BACKEND_URL environment variable is set
if [ -z "$BACKEND_URL" ]; then
  echo "BACKEND_URL environment variable is not set. Using default."
  BACKEND_URL="https://hrm-web-app-gha1.onrender.com"
fi

# Ensure BACKEND_URL includes a protocol
if ! echo "$BACKEND_URL" | grep -qE '^https?://'; then
  echo "BACKEND_URL does not include a protocol. Prepending https://"
  BACKEND_URL="https://$BACKEND_URL"
fi

# Check if the Nginx config file exists and is writable
if [ ! -w /etc/nginx/conf.d/app.conf ]; then
  echo "Error: /etc/nginx/conf.d/app.conf does not exist or is not writable."
  exit 1
fi

# Log the original proxy_pass value
ORIGINAL_PROXY_PASS=$(grep -oP 'proxy_pass \K.*(?=;)' /etc/nginx/conf.d/app.conf)
echo "Original proxy_pass: $ORIGINAL_PROXY_PASS"

# Replace the proxy_pass line in the Nginx config
sed -i "s|^proxy_pass .*;|proxy_pass $BACKEND_URL;|g" /etc/nginx/conf.d/app.conf

echo "Updated proxy_pass to $BACKEND_URL"