# FWD - Build a Storefront Backend

Advanced Track - Project #2

## Description:

A Backend designed with TypeScript, NodeJs and PostgreSQL. It's for a store where users can sign up and log in, navigate the list of products, view specifications of a specific product and add products to their cart so that they can make orders. JWT authentication and authorization is applied. The API is designed to be RESTful.

## Package Manager used:

- `npm`

## Dependencies:

- bcrypt, body-parser, cors, db-migrate, db-migrate-pg, dotenv, express, jsonwebtoken, morgan, pg.

## Scripts:

- `npm run prettier`: runs prettier to format code in both JS & TS files.
- `npm run lint`: runs ESLint to make sure code style is consistent.
- `npm run lint:fix`: runs ESLint to fix errors.
- `npm run format`: runs prettier and ESLint both together.
- `npm run build`: compiles TypeScript files into JavaScript files in 'build' folder.
- `npm run test`: runs all the migrations on the testing database then runs jasmine unit tests on TypeScript files, deletes all the migrations after testing.
- `npm run watch`: starts/spins the server in development mode (runs server.ts).
- `npm run start`: builds the projcet and starts the app (runs index.js).
- `npm run migrate`: runs all the migrations on the development database.
- `npm run delmigrate`: deletes all migrations from both the development and testing database.

## Instructions:

- Type `npm install` into your terminal to install all the dependencies and devDependencies for this project.

- Create ".env" file which will contain the Environment Variables:

  - PORT : port at which server is running
  - ENV=dev : default environment
  - POSTGRES_HOST=localhost
  - POSTGRES_PORT : port at which database is running
  - POSTGRES_DB : name of development database
  - POSTGRES_DB_TEST : name of testing database
  - POSTGRES_USER
  - POSTGRES_PASSWORD
  - BCRYPT_PASSWORD : pepper
  - SALT_ROUNDS
  - TOKEN_SECRET

- Make sure you have created two databases, one for development and another one for testing, for example:
  - Create user: `CREATE USER hadir WITH PASSWORD '00000hh';`
  - Create both databases: 
    - `CREATE DATABASE store_dev;`
    - `CREATE DATABASE store_test;`
  - Grant all database privileges to user in both databases:
    - `GRANT ALL PRIVILEGES ON DATABASE store_dev TO hadir;`
    - `GRANT ALL PRIVILEGES ON DATABASE store_test TO hadir;`

## Ports:

- Server Port: `3000`.
- Database Port: `5432`.

## Endpoints:

1- Main Endpoint: `http://localhost:3000`

2- Cors Endpoint: `http://localhost:3000/test-cors`

3- Main API Endpoint: `http://localhost:3000/api`

4- Users Routes: `http://localhost:3000/api/users`

5- Products Routes: `http://localhost:3000/api/products`

6- Orders Routes: `http://localhost:3000/api/orders`

Any information related to the RESTFUL routes or the database schema will be found in 'REQUIREMENTS.md'.