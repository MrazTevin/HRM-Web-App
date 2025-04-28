FROM nginx:alpine
# Remove the default config
RUN rm /etc/nginx/conf.d/default.conf
# Add your custom config
COPY ./conf.d /etc/nginx/conf.d
# Add the update script
COPY ./update-upstream.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/update-upstream.sh