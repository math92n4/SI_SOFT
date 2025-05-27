FROM postgres:latest

COPY init.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_DB=db
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password