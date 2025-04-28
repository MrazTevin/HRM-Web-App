FROM nginx:alpine
COPY ./conf.d /etc/nginx/conf.d

# Add a script to update the app upstream at runtime
COPY ./update-upstream.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/update-upstream.sh