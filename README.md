# Angular2-Lumen
This is example of Angular2, Laravel/Lumen, Authentication with JWT.

## Install Server

### Requirements

  - Lumen
  - Composer
  - MySQL server (should import db from ./lumen/lumenauth.sql)

### Install

    $ cd lumen
    $ composer install

### Setup & Run

Update contens in .env, you need to set smpt server and account there. 

    $ php -S localhost:8000 -t public

It will run Laravel/Lumen API server on localhost:8000

## Install Client & Run

    $ cd ng2
    $ npm install
    $ npm start

It will run Angular2 lite-server on localhost:3000.

It also requires API server on localhost:8000, you can change API url in _services/api.services.ts

