###
Setup project
##
```console
$ npm install -g dbdocs
$ docker-compose up -d
$ docker exec -it mysql_db mysql -u root -p
```

###
Generate docs
##

```console
$ dbdocs login
```
Follow instructions and get a token

```console
$ dbdocs build schema.dbml
```
Follow instructions and get a link
##

https://dbdocs.io/Mathias%20Wulff%20Nielsen/database-docs