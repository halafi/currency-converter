# Currency Convertor

## Deployment

1. `$ docker-compose up`
2. migrate db: `$ docker exec -it $(docker ps | grep currconv_api_1 | awk '{ print $1 }') /bin/sh -c 'npm run migrate'`

default ports: 8000, 8080

## Development

### API

Setup Postgres:

1. `$ docker pull postgres:12.2`
2. `$ mkdir -p $HOME/docker/volumes/postgres`
3. `$ docker run --rm --name pg-dev -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=main -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres:12.2`
4. `$ cd api && npm run initdb` (migrate and seed)
5. Run API `$ cd api && npm run start` (default port 8000)

### Frontend

6. Run Frontend `$ cd frontend && npm run start` (default port 8080)
