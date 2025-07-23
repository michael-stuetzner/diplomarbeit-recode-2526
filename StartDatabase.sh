docker run --name postgres \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -v ./docker-data/postgres:/var/lib/postgresql/data \
  -d postgres:17