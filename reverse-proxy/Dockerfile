FROM nginx:stable-alpine
COPY ./nginx-proxy /etc/nginx/conf.d
EXPOSE 80
RUN echo "confFile=\"\$(ls /etc/nginx/conf.d/nginx.conf)\" && \
          envsubst '\$SERVER_NAME' < \${confFile} > nginx.tmp && \
          mv nginx.tmp  \${confFile}  && \
          upstream=\"\$(ls /etc/nginx/conf.d/upstream_mac.conf)\" && \
          envsubst '\$UPSTREAM_API' < \${upstream} > upstream_mac.tmp && \
          mv upstream_mac.tmp  \${upstream}  && \
          nginx -g 'daemon off;'" > run.sh

ENTRYPOINT ["sh", "run.sh"]

# dockerfile
#FROM nginx:1.16.0-alpine
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx-proxy/nginx.conf /etc/nginx/nginx.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]+