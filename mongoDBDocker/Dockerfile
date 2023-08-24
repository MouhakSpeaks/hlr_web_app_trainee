FROM mongo:4.2
ENV MONGO_INITDB_DATABASE admin
ENV MONGO_INITDB_ROOT_USERNAME ahana100
ENV MONGO_INITDB_ROOT_PASSWORD admin
COPY mongo-init.js /docker-entrypoint-initdb.d/
EXPOSE 27017
CMD ["mongod"]
